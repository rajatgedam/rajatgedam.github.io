import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Section } from '../common/Section'

type GameStatus = 'idle' | 'running' | 'gameover'

interface Pipe {
  x: number
  gapY: number
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
const BEST_SCORE_KEY = 'fun-flap-best-score'

interface RuntimeState {
  birdY: number
  birdVel: number
  pipes: Pipe[]
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

function resetRuntimeState(): RuntimeState {
  return {
    birdY: HEIGHT * 0.42,
    birdVel: 0,
    pipes: [],
    spawnTimerMs: 0,
    speed: 280,
  }
}

export function FunSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const runtimeRef = useRef<RuntimeState>(resetRuntimeState())

  const [status, setStatus] = useState<GameStatus>('idle')
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window === 'undefined') {
      return 0
    }
    const saved = window.localStorage.getItem(BEST_SCORE_KEY)
    const parsed = Number(saved)
    return Number.isFinite(parsed) ? parsed : 0
  })

  const registerScore = (nextScore: number) => {
    setScore(nextScore)
    setBestScore((previousBest) => {
      const nextBest = Math.max(previousBest, nextScore)
      if (nextBest !== previousBest) {
        window.localStorage.setItem(BEST_SCORE_KEY, String(nextBest))
      }
      return nextBest
    })
  }

  const startGame = () => {
    runtimeRef.current = resetRuntimeState()
    setScore(0)
    setStatus('running')
  }

  const gameOver = () => {
    setStatus('gameover')
  }

  const flap = () => {
    if (status === 'idle') {
      startGame()
      runtimeRef.current.birdVel = FLAP_VELOCITY
      return
    }
    if (status === 'running') {
      runtimeRef.current.birdVel = FLAP_VELOCITY
      return
    }
    startGame()
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'ArrowUp' || event.code === 'KeyW') {
        event.preventDefault()
        flap()
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
      ctx.fillText(`Score: ${score}`, 30, 44)
      ctx.font = "500 15px 'Space Grotesk', sans-serif"
      ctx.fillStyle = '#adc3e8'
      ctx.fillText(`Best: ${bestScore}`, 30, 70)
    }

    const drawOverlay = () => {
      if (status === 'running') {
        return
      }

      ctx.fillStyle = 'rgba(2, 8, 20, 0.42)'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)

      ctx.textAlign = 'center'
      ctx.fillStyle = '#e9f2ff'
      ctx.font = "700 34px 'Space Grotesk', sans-serif"
      ctx.fillText(status === 'idle' ? 'Fun Mode: Sky Hopper' : 'Crash!', WIDTH / 2, HEIGHT / 2 - 26)

      ctx.font = "500 18px 'Space Grotesk', sans-serif"
      ctx.fillStyle = '#adc3e8'
      ctx.fillText('Press Space / ArrowUp / W or Tap to flap', WIDTH / 2, HEIGHT / 2 + 10)
      ctx.fillText(
        status === 'idle' ? 'Avoid pipes forever. It gets faster over time.' : 'Tap or press Space to restart.',
        WIDTH / 2,
        HEIGHT / 2 + 38,
      )
      ctx.textAlign = 'start'
    }

    const tick = (timestamp: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp
      }

      const dt = Math.min(0.035, (timestamp - lastTimeRef.current) / 1000)
      lastTimeRef.current = timestamp

      const state = runtimeRef.current

      if (status === 'running') {
        state.birdVel += GRAVITY * dt
        state.birdY += state.birdVel * dt

        state.spawnTimerMs += dt * 1000
        if (state.spawnTimerMs >= PIPE_SPAWN_MS) {
          state.spawnTimerMs = 0
          state.pipes.push({ x: WIDTH + 40, gapY: randomGapY(), passed: false })
        }

        state.speed += 5 * dt
        const gapSize = Math.max(104, BASE_GAP - score * 0.9)

        state.pipes = state.pipes
          .map((pipe) => ({ ...pipe, x: pipe.x - state.speed * dt }))
          .filter((pipe) => pipe.x + PIPE_WIDTH > -30)

        for (const pipe of state.pipes) {
          if (!pipe.passed && pipe.x + PIPE_WIDTH < BIRD_X - BIRD_RADIUS) {
            pipe.passed = true
            registerScore(score + 1)
          }

          const topHeight = pipe.gapY - gapSize / 2
          const bottomY = pipe.gapY + gapSize / 2
          const intersectsX = BIRD_X + BIRD_RADIUS > pipe.x && BIRD_X - BIRD_RADIUS < pipe.x + PIPE_WIDTH
          const hitsTop = state.birdY - BIRD_RADIUS < topHeight
          const hitsBottom = state.birdY + BIRD_RADIUS > bottomY
          if (intersectsX && (hitsTop || hitsBottom)) {
            gameOver()
            break
          }
        }

        if (state.birdY - BIRD_RADIUS < 0 || state.birdY + BIRD_RADIUS > HEIGHT - GROUND_HEIGHT) {
          gameOver()
        }
      }

      drawBackground()
      drawPipes(state.pipes, Math.max(104, BASE_GAP - score * 0.9))
      drawBird(state.birdY, state.birdVel)
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
  }, [bestScore, score, status])

  return (
    <Section
      id="fun"
      kicker="Fun"
      title="A tacky corner of the site"
      subtitle="Sky Hopper is an endless mini-game inspired by classic one-button arcade loops."
    >
      <motion.div className="fun-grid" {...fadeInUp}>
        <div className="panel fun-card">
          <canvas
            ref={canvasRef}
            className="fun-canvas"
            width={WIDTH}
            height={HEIGHT}
            onPointerDown={flap}
            role="img"
            aria-label="Sky Hopper game canvas"
          />
        </div>

        <div className="panel fun-meta">
          <h3>How to play</h3>
          <ul className="bullet-list">
            <li>Press Space, Arrow Up, W, or tap the canvas to flap.</li>
            <li>Pass through gaps to score.</li>
            <li>The game never ends by design, but each run ends on collision.</li>
            <li>Best score is saved locally in your browser.</li>
          </ul>

          <div className="cta-row">
            <button type="button" className="btn btn-primary" onClick={flap}>
              {status === 'gameover' ? 'Restart Run' : 'Flap'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={startGame}>
              Fresh Start
            </button>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}