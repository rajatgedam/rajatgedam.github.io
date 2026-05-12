import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { motion } from 'framer-motion'
import { Section } from '../common/Section'

type GameMode = 'none' | 'bird' | 'car'
type GameStatus = 'idle' | 'running' | 'gameover'

interface Pipe {
  x: number
  gapY: number
  passed: boolean
}

interface CarObstacle {
  lane: number
  y: number
  passed: boolean
}

const WIDTH = 900
const HEIGHT = 420
const GROUND_HEIGHT = 56
const BIRD_X = 190
const BIRD_RADIUS = 14
const PIPE_WIDTH = 74
const BASE_GAP = 138
const PIPE_SPAWN_MS = 1350
const GRAVITY = 1800
const FLAP_VELOCITY = -510
const MIN_GAP_Y = 90
const MAX_GAP_Y = HEIGHT - GROUND_HEIGHT - 90
const BIRD_BEST_SCORE_KEY = 'fun-bird-best-score'
const CAR_BEST_SCORE_KEY = 'fun-car-best-score'

const CAR_LANES_X = [WIDTH * 0.32, WIDTH * 0.5, WIDTH * 0.68]
const CAR_WIDTH = 62
const CAR_HEIGHT = 96
const CAR_Y = HEIGHT - GROUND_HEIGHT - CAR_HEIGHT * 0.6
const CAR_OBSTACLE_WIDTH = 66
const CAR_OBSTACLE_HEIGHT = 102
const CAR_SPAWN_MS = 860

interface BirdRuntimeState {
  birdY: number
  birdVel: number
  pipes: Pipe[]
  spawnTimerMs: number
  speed: number
}

interface CarRuntimeState {
  lane: number
  obstacles: CarObstacle[]
  spawnTimerMs: number
  speed: number
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5 },
}

function randomGapY() {
  return MIN_GAP_Y + Math.random() * (MAX_GAP_Y - MIN_GAP_Y)
}

function randomLane() {
  return Math.floor(Math.random() * CAR_LANES_X.length)
}

function resetBirdState(): BirdRuntimeState {
  return {
    birdY: HEIGHT * 0.42,
    birdVel: 0,
    pipes: [],
    spawnTimerMs: 0,
    speed: 280,
  }
}

function resetCarState(): CarRuntimeState {
  return {
    lane: 1,
    obstacles: [],
    spawnTimerMs: 0,
    speed: 300,
  }
}

function loadBestScore(key: string) {
  if (typeof window === 'undefined') {
    return 0
  }
  const saved = window.localStorage.getItem(key)
  const parsed = Number(saved)
  return Number.isFinite(parsed) ? parsed : 0
}

export function FunSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  const birdRef = useRef<BirdRuntimeState>(resetBirdState())
  const carRef = useRef<CarRuntimeState>(resetCarState())

  const modeRef = useRef<GameMode>('none')
  const statusRef = useRef<GameStatus>('idle')
  const scoreRef = useRef(0)

  const [mode, setMode] = useState<GameMode>('none')
  const [status, setStatus] = useState<GameStatus>('idle')
  const [score, setScore] = useState(0)
  const [bestBirdScore, setBestBirdScore] = useState(() => loadBestScore(BIRD_BEST_SCORE_KEY))
  const [bestCarScore, setBestCarScore] = useState(() => loadBestScore(CAR_BEST_SCORE_KEY))

  const setModeState = (nextMode: GameMode) => {
    modeRef.current = nextMode
    setMode(nextMode)
  }

  const setStatusState = (nextStatus: GameStatus) => {
    statusRef.current = nextStatus
    setStatus(nextStatus)
  }

  const resetScore = () => {
    scoreRef.current = 0
    setScore(0)
  }

  const addPoint = () => {
    setScore((previous) => {
      const next = previous + 1
      scoreRef.current = next

      if (modeRef.current === 'bird') {
        setBestBirdScore((prevBest) => {
          const nextBest = Math.max(prevBest, next)
          if (nextBest !== prevBest) {
            window.localStorage.setItem(BIRD_BEST_SCORE_KEY, String(nextBest))
          }
          return nextBest
        })
      } else if (modeRef.current === 'car') {
        setBestCarScore((prevBest) => {
          const nextBest = Math.max(prevBest, next)
          if (nextBest !== prevBest) {
            window.localStorage.setItem(CAR_BEST_SCORE_KEY, String(nextBest))
          }
          return nextBest
        })
      }

      return next
    })
  }

  const resetCurrentGameRuntime = () => {
    if (modeRef.current === 'bird') {
      birdRef.current = resetBirdState()
    }
    if (modeRef.current === 'car') {
      carRef.current = resetCarState()
    }
    lastTimeRef.current = 0
  }

  const startRun = () => {
    resetScore()
    resetCurrentGameRuntime()
    setStatusState('running')
  }

  const chooseGame = (nextMode: Exclude<GameMode, 'none'>) => {
    setModeState(nextMode)
    setStatusState('idle')
    resetScore()
    if (nextMode === 'bird') {
      birdRef.current = resetBirdState()
    }
    if (nextMode === 'car') {
      carRef.current = resetCarState()
    }
    lastTimeRef.current = 0
  }

  const exitGame = () => {
    setModeState('none')
    setStatusState('idle')
    resetScore()
    lastTimeRef.current = 0
  }

  const resetRun = () => {
    if (modeRef.current === 'none') {
      return
    }
    resetScore()
    resetCurrentGameRuntime()
    setStatusState('idle')
  }

  const flapBird = () => {
    if (modeRef.current !== 'bird') {
      return
    }

    if (statusRef.current !== 'running') {
      startRun()
    }

    birdRef.current.birdVel = FLAP_VELOCITY
  }

  const moveCar = (delta: number) => {
    const runtime = carRef.current
    runtime.lane = Math.max(0, Math.min(CAR_LANES_X.length - 1, runtime.lane + delta))
  }

  const carActionFromPointer = (pointerX: number, target: HTMLCanvasElement) => {
    if (modeRef.current !== 'car') {
      return
    }

    if (statusRef.current !== 'running') {
      startRun()
      return
    }

    const bounds = target.getBoundingClientRect()
    const localX = pointerX - bounds.left
    if (localX < bounds.width / 2) {
      moveCar(-1)
    } else {
      moveCar(1)
    }
  }

  const handleCanvasPointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (mode === 'bird') {
      flapBird()
      return
    }
    if (mode === 'car') {
      carActionFromPointer(event.clientX, event.currentTarget)
    }
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const currentMode = modeRef.current
      if (currentMode === 'none') {
        return
      }

      if (event.code === 'Escape') {
        exitGame()
        return
      }

      if (currentMode === 'bird' && (event.code === 'Space' || event.code === 'ArrowUp' || event.code === 'KeyW')) {
        event.preventDefault()
        flapBird()
        return
      }

      if (currentMode === 'car') {
        if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
          event.preventDefault()
          if (statusRef.current !== 'running') {
            startRun()
          }
          moveCar(-1)
          return
        }
        if (event.code === 'ArrowRight' || event.code === 'KeyD') {
          event.preventDefault()
          if (statusRef.current !== 'running') {
            startRun()
          }
          moveCar(1)
          return
        }
        if (event.code === 'Space' || event.code === 'Enter' || event.code === 'ArrowUp') {
          event.preventDefault()
          startRun()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT)
      gradient.addColorStop(0, '#0f2b56')
      gradient.addColorStop(0.65, '#143b72')
      gradient.addColorStop(1, '#1d4f88')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, WIDTH, HEIGHT)

      ctx.fillStyle = 'rgba(117, 225, 213, 0.13)'
      ctx.beginPath()
      ctx.arc(120, 84, 80, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = 'rgba(117, 168, 255, 0.18)'
      ctx.beginPath()
      ctx.arc(760, 106, 120, 0, Math.PI * 2)
      ctx.fill()

      for (let i = 0; i < 22; i += 1) {
        const x = ((i * 113 + performance.now() * 0.04) % (WIDTH + 50)) - 25
        const y = 34 + ((i * 37) % 160)
        ctx.fillStyle = 'rgba(233, 242, 255, 0.2)'
        ctx.fillRect(x, y, 3, 3)
      }
    }

    const drawPipes = (pipes: Pipe[], gapSize: number) => {
      pipes.forEach((pipe) => {
        const topHeight = pipe.gapY - gapSize / 2
        const bottomY = pipe.gapY + gapSize / 2
        const bottomHeight = HEIGHT - GROUND_HEIGHT - bottomY

        ctx.fillStyle = '#75e1d5'
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, topHeight)
        ctx.fillRect(pipe.x, bottomY, PIPE_WIDTH, bottomHeight)

        ctx.fillStyle = '#4cb9ad'
        ctx.fillRect(pipe.x - 4, topHeight - 14, PIPE_WIDTH + 8, 14)
        ctx.fillRect(pipe.x - 4, bottomY, PIPE_WIDTH + 8, 14)
      })
    }

    const drawRoad = () => {
      ctx.fillStyle = '#0a1f3f'
      ctx.fillRect(0, 0, WIDTH, HEIGHT - GROUND_HEIGHT)

      ctx.fillStyle = '#0f2d56'
      ctx.fillRect(WIDTH * 0.16, 0, WIDTH * 0.68, HEIGHT - GROUND_HEIGHT)

      ctx.strokeStyle = 'rgba(233, 242, 255, 0.35)'
      ctx.lineWidth = 2
      for (let i = 1; i < CAR_LANES_X.length; i += 1) {
        const divider = (CAR_LANES_X[i - 1] + CAR_LANES_X[i]) / 2
        for (let y = -20; y < HEIGHT - GROUND_HEIGHT; y += 40) {
          ctx.beginPath()
          ctx.moveTo(divider, y)
          ctx.lineTo(divider, y + 18)
          ctx.stroke()
        }
      }
    }

    const drawCar = (lane: number) => {
      const carX = CAR_LANES_X[lane]

      ctx.fillStyle = '#75a8ff'
      ctx.beginPath()
      ctx.roundRect(carX - CAR_WIDTH / 2, CAR_Y - CAR_HEIGHT / 2, CAR_WIDTH, CAR_HEIGHT, 16)
      ctx.fill()

      ctx.fillStyle = '#d8ecff'
      ctx.beginPath()
      ctx.roundRect(carX - 22, CAR_Y - 20, 44, 26, 8)
      ctx.fill()

      ctx.fillStyle = '#0b1b35'
      ctx.fillRect(carX - 30, CAR_Y - 38, 10, 18)
      ctx.fillRect(carX + 20, CAR_Y - 38, 10, 18)
      ctx.fillRect(carX - 30, CAR_Y + 20, 10, 18)
      ctx.fillRect(carX + 20, CAR_Y + 20, 10, 18)
    }

    const drawObstacles = (obstacles: CarObstacle[]) => {
      obstacles.forEach((obstacle) => {
        const x = CAR_LANES_X[obstacle.lane]
        ctx.fillStyle = '#ffd48b'
        ctx.beginPath()
        ctx.roundRect(
          x - CAR_OBSTACLE_WIDTH / 2,
          obstacle.y - CAR_OBSTACLE_HEIGHT / 2,
          CAR_OBSTACLE_WIDTH,
          CAR_OBSTACLE_HEIGHT,
          14,
        )
        ctx.fill()

        ctx.fillStyle = '#7a4f10'
        ctx.fillRect(x - 24, obstacle.y - 24, 14, 14)
        ctx.fillRect(x + 10, obstacle.y - 24, 14, 14)
      })
    }

    const drawBird = (birdY: number, birdVel: number) => {
      const tilt = Math.max(-0.6, Math.min(0.7, birdVel / 700))
      ctx.save()
      ctx.translate(BIRD_X, birdY)
      ctx.rotate(tilt)

      ctx.fillStyle = '#ffd48b'
      ctx.beginPath()
      ctx.arc(0, 0, BIRD_RADIUS, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#b06f1f'
      ctx.beginPath()
      ctx.moveTo(10, -2)
      ctx.lineTo(22, 2)
      ctx.lineTo(10, 6)
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = '#051530'
      ctx.beginPath()
      ctx.arc(4, -5, 2.2, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    const drawGround = () => {
      ctx.fillStyle = '#0c1f3e'
      ctx.fillRect(0, HEIGHT - GROUND_HEIGHT, WIDTH, GROUND_HEIGHT)

      ctx.strokeStyle = 'rgba(117, 168, 255, 0.35)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, HEIGHT - GROUND_HEIGHT)
      ctx.lineTo(WIDTH, HEIGHT - GROUND_HEIGHT)
      ctx.stroke()

      for (let i = 0; i < WIDTH; i += 26) {
        ctx.fillStyle = i % 52 === 0 ? 'rgba(117, 168, 255, 0.22)' : 'rgba(117, 168, 255, 0.1)'
        ctx.fillRect(i, HEIGHT - 18, 18, 8)
      }
    }

    const drawHud = () => {
      ctx.fillStyle = 'rgba(7, 19, 43, 0.8)'
      ctx.fillRect(18, 16, 164, 72)
      ctx.strokeStyle = 'rgba(129, 183, 255, 0.5)'
      ctx.strokeRect(18, 16, 164, 72)

      ctx.fillStyle = '#e9f2ff'
      ctx.font = "700 19px 'Space Grotesk', sans-serif"
      ctx.fillText(`Score: ${scoreRef.current}`, 30, 44)
      ctx.font = "500 15px 'Space Grotesk', sans-serif"
      ctx.fillStyle = '#adc3e8'
      if (modeRef.current === 'bird') {
        ctx.fillText(`Best: ${bestBirdScore}`, 30, 70)
      } else if (modeRef.current === 'car') {
        ctx.fillText(`Best: ${bestCarScore}`, 30, 70)
      }
    }

    const drawOverlay = () => {
      if (modeRef.current === 'none' || statusRef.current === 'running') {
        return
      }

      ctx.fillStyle = 'rgba(2, 8, 20, 0.42)'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)

      ctx.textAlign = 'center'
      ctx.fillStyle = '#e9f2ff'
      ctx.font = "700 34px 'Space Grotesk', sans-serif"
      if (modeRef.current === 'bird') {
        ctx.fillText(statusRef.current === 'idle' ? 'Sky Hopper Ready' : 'Crash!', WIDTH / 2, HEIGHT / 2 - 26)
      } else {
        ctx.fillText(statusRef.current === 'idle' ? 'Neon Sprint Ready' : 'Wipeout!', WIDTH / 2, HEIGHT / 2 - 26)
      }

      ctx.font = "500 18px 'Space Grotesk', sans-serif"
      ctx.fillStyle = '#adc3e8'
      if (modeRef.current === 'bird') {
        ctx.fillText('Press Space / ArrowUp / W or tap to flap', WIDTH / 2, HEIGHT / 2 + 10)
        ctx.fillText(
          statusRef.current === 'idle'
            ? 'Thread the gaps and chase your best.'
            : 'Tap or press Space to restart.',
          WIDTH / 2,
          HEIGHT / 2 + 38,
        )
      } else {
        ctx.fillText('Use Left/Right or tap canvas sides to dodge', WIDTH / 2, HEIGHT / 2 + 10)
        ctx.fillText(
          statusRef.current === 'idle'
            ? 'Stay in lane and survive the traffic stream.'
            : 'Press Enter or tap to restart.',
          WIDTH / 2,
          HEIGHT / 2 + 38,
        )
      }
      ctx.textAlign = 'start'
    }

    const tick = (timestamp: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp
      }

      const dt = Math.min(0.035, (timestamp - lastTimeRef.current) / 1000)
      lastTimeRef.current = timestamp

      if (modeRef.current === 'bird') {
        const state = birdRef.current

        if (statusRef.current === 'running') {
          state.birdVel += GRAVITY * dt
          state.birdY += state.birdVel * dt

          state.spawnTimerMs += dt * 1000
          if (state.spawnTimerMs >= PIPE_SPAWN_MS) {
            state.spawnTimerMs = 0
            state.pipes.push({ x: WIDTH + 40, gapY: randomGapY(), passed: false })
          }

          state.speed += 5 * dt
          const gapSize = Math.max(104, BASE_GAP - scoreRef.current * 0.9)

          state.pipes = state.pipes
            .map((pipe) => ({ ...pipe, x: pipe.x - state.speed * dt }))
            .filter((pipe) => pipe.x + PIPE_WIDTH > -30)

          for (const pipe of state.pipes) {
            if (!pipe.passed && pipe.x + PIPE_WIDTH < BIRD_X - BIRD_RADIUS) {
              pipe.passed = true
              addPoint()
            }

            const topHeight = pipe.gapY - gapSize / 2
            const bottomY = pipe.gapY + gapSize / 2
            const intersectsX = BIRD_X + BIRD_RADIUS > pipe.x && BIRD_X - BIRD_RADIUS < pipe.x + PIPE_WIDTH
            const hitsTop = state.birdY - BIRD_RADIUS < topHeight
            const hitsBottom = state.birdY + BIRD_RADIUS > bottomY
            if (intersectsX && (hitsTop || hitsBottom)) {
              setStatusState('gameover')
              break
            }
          }

          if (state.birdY - BIRD_RADIUS < 0 || state.birdY + BIRD_RADIUS > HEIGHT - GROUND_HEIGHT) {
            setStatusState('gameover')
          }
        }

        drawBackground()
        drawPipes(state.pipes, Math.max(104, BASE_GAP - scoreRef.current * 0.9))
        drawBird(state.birdY, state.birdVel)
      } else if (modeRef.current === 'car') {
        const state = carRef.current

        if (statusRef.current === 'running') {
          state.spawnTimerMs += dt * 1000
          if (state.spawnTimerMs >= CAR_SPAWN_MS) {
            state.spawnTimerMs = 0
            state.obstacles.push({ lane: randomLane(), y: -CAR_OBSTACLE_HEIGHT, passed: false })
          }

          state.speed += 6 * dt
          state.obstacles = state.obstacles
            .map((obstacle) => ({ ...obstacle, y: obstacle.y + state.speed * dt }))
            .filter((obstacle) => obstacle.y < HEIGHT + CAR_OBSTACLE_HEIGHT)

          for (const obstacle of state.obstacles) {
            if (!obstacle.passed && obstacle.y - CAR_OBSTACLE_HEIGHT / 2 > CAR_Y + CAR_HEIGHT / 2) {
              obstacle.passed = true
              addPoint()
            }

            const sameLane = obstacle.lane === state.lane
            const verticalOverlap =
              obstacle.y + CAR_OBSTACLE_HEIGHT / 2 > CAR_Y - CAR_HEIGHT / 2 &&
              obstacle.y - CAR_OBSTACLE_HEIGHT / 2 < CAR_Y + CAR_HEIGHT / 2

            if (sameLane && verticalOverlap) {
              setStatusState('gameover')
              break
            }
          }
        }

        drawBackground()
        drawRoad()
        drawObstacles(state.obstacles)
        drawCar(state.lane)
      } else {
        drawBackground()
      }

      drawGround()
      drawHud()
      drawOverlay()

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [bestBirdScore, bestCarScore])

  const activeBest = mode === 'bird' ? bestBirdScore : mode === 'car' ? bestCarScore : Math.max(bestBirdScore, bestCarScore)

  const controlsText =
    mode === 'bird'
      ? ['Press Space, Arrow Up, W, or tap to flap.', 'Thread the gaps to build score.']
      : mode === 'car'
        ? ['Use Arrow Left/Right or A/D to change lanes.', 'Tap left or right side of canvas on mobile.']
        : ['Choose a game to start.', 'Bird is jump timing. Car is lane timing.']

  const modeDescription =
    mode === 'bird'
      ? 'Endless one-button precision with rising speed and tighter windows.'
      : mode === 'car'
        ? 'Arcade lane-dodge sprint with escalating traffic pressure.'
        : 'Pick Bird or Car to launch a quick game.'

  const statusLabel =
    mode === 'none'
      ? 'Not Selected'
      : status === 'running'
        ? 'Running'
        : status === 'gameover'
          ? 'Game Over'
          : 'Ready'

  const statusClass =
    mode === 'none'
      ? 'fun-status-pill fun-status-idle'
      : status === 'running'
        ? 'fun-status-pill fun-status-running'
        : status === 'gameover'
          ? 'fun-status-pill fun-status-over'
          : 'fun-status-pill fun-status-ready'

  return (
    <Section
      id="fun"
      kicker="Fun"
      title="Interactive Breakroom"
      subtitle="A professional excuse to procrastinate: pick a game, chase a score, get back to shipping."
    >
      <motion.div className="fun-grid" {...fadeInUp}>
        <div className="panel fun-card">
          <div className="fun-game-buttons">
            <button
              type="button"
              className={mode === 'bird' ? 'btn btn-primary' : 'btn btn-secondary'}
              onClick={() => chooseGame('bird')}
            >
              Bird
            </button>
            <button
              type="button"
              className={mode === 'car' ? 'btn btn-primary' : 'btn btn-secondary'}
              onClick={() => chooseGame('car')}
            >
              Car
            </button>
            <button type="button" className="btn btn-secondary" onClick={exitGame} disabled={mode === 'none'}>
              Exit
            </button>
          </div>

          <canvas
            ref={canvasRef}
            className={mode === 'none' ? 'fun-canvas fun-canvas-inactive' : 'fun-canvas'}
            width={WIDTH}
            height={HEIGHT}
            onPointerDown={handleCanvasPointerDown}
            role="img"
            aria-label="Fun game canvas"
          />
        </div>

        <div className="panel fun-meta">
          <h3>{mode === 'bird' ? 'Sky Hopper' : mode === 'car' ? 'Neon Sprint' : 'Pick Your Mode'}</h3>
          <p className="muted fun-mode-copy">{modeDescription}</p>

          <div className="fun-stats">
            <p className="fun-stat-row">
              <span className="fun-stat-label">Status</span>
              <span className={statusClass}>{statusLabel}</span>
            </p>
            <p className="fun-stat-row">
              <span className="fun-stat-label">Current score</span>
              <span className="fun-stat-value">{score}</span>
            </p>
            <p className="fun-stat-row">
              <span className="fun-stat-label">Best score</span>
              <span className="fun-stat-value">{activeBest}</span>
            </p>
          </div>

          <ul className="bullet-list fun-rules">
            {controlsText.map((text) => (
              <li key={text}>{text}</li>
            ))}
            <li>Choose Bird or Car anytime to switch modes.</li>
            <li>Exit closes the game and clears the current run.</li>
            <li>Best score is saved locally in your browser.</li>
          </ul>

          <div className="cta-row">
            <button type="button" className="btn btn-primary" onClick={startRun} disabled={mode === 'none'}>
              {status === 'gameover' ? 'Restart Run' : 'Start Run'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetRun}
              disabled={mode === 'none'}
            >
              Reset Run
            </button>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}