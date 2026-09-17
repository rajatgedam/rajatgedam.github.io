import { useReducedMotion, motion } from 'framer-motion'

// Wing feathers fan from a shoulder point near the body, swept upward and
// outward only (a raised, "rising" posture) so they read as two distinct
// wings rather than a radial burst. Mirrored for the left wing via a
// transform, so only the right half is authored here.
const WING_FEATHERS = [
  'M258,240 C200,160 260,80 340,55 C380,120 330,190 276,225 Z',
  'M263,250 C300,190 360,120 430,95 C460,150 400,205 280,236 Z',
  'M266,258 C350,235 430,190 480,175 C500,215 420,240 282,246 Z',
  'M262,268 C330,290 390,275 430,255 C420,290 330,300 248,258 Z',
]

const WING_COVERT = 'M255,245 C240,200 270,160 300,140 C310,180 280,230 265,255 Z'

const TAIL_FEATHERS = [
  'M242,352 C238,380 242,405 250,420 C258,405 262,380 258,352 Z',
  'M228,348 C210,365 190,390 180,410 C200,395 225,370 242,345 Z',
  'M272,348 C290,365 310,390 320,410 C300,395 275,370 258,345 Z',
]

const BODY_PATH =
  'M250,190 C280,205 305,240 305,290 C305,325 285,345 250,355 C215,345 195,325 195,290 C195,240 220,205 250,190 Z'

const CREST_SPIKES = ['M233,148 L239,100 L249,143 Z', 'M250,146 L250,95 L262,144 Z', 'M264,148 L273,105 L280,146 Z']

export function PhoenixIllustration() {
  const shouldReduceMotion = useReducedMotion()

  const breathe = shouldReduceMotion
    ? {}
    : {
        animate: { scale: [1, 1.025, 1] },
        transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const },
      }

  const flicker = shouldReduceMotion
    ? { opacity: 0.5 }
    : {
        animate: { opacity: [0.35, 0.6, 0.35] },
        transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' as const },
      }

  return (
    <motion.svg
      viewBox="0 0 500 500"
      className="phoenix-illustration"
      role="img"
      aria-label="Stylized illustration of a phoenix, wings spread, transitioning from flame red to ember blue"
      {...breathe}
    >
      <defs>
        <linearGradient id="phx-feather" x1="15%" y1="92%" x2="92%" y2="8%">
          <stop offset="0%" stopColor="#c81e0f" />
          <stop offset="32%" stopColor="#ff6a1f" />
          <stop offset="64%" stopColor="#6b4bff" />
          <stop offset="100%" stopColor="#3fc7ff" />
        </linearGradient>
        <radialGradient id="phx-body" cx="50%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#ffc37a" />
          <stop offset="45%" stopColor="#ff5a1f" />
          <stop offset="100%" stopColor="#c81e0f" />
        </radialGradient>
        <filter id="phx-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Soft blurred duplicate: the illustration's own light-emitting halo */}
      <motion.g filter="url(#phx-glow)" {...flicker}>
        {TAIL_FEATHERS.map((d) => (
          <path key={`glow-tail-${d.slice(0, 6)}`} d={d} fill="url(#phx-feather)" />
        ))}
        {WING_FEATHERS.map((d) => (
          <path key={`glow-r-${d.slice(0, 6)}`} d={d} fill="url(#phx-feather)" />
        ))}
        <g transform="translate(500,0) scale(-1,1)">
          {WING_FEATHERS.map((d) => (
            <path key={`glow-l-${d.slice(0, 6)}`} d={d} fill="url(#phx-feather)" />
          ))}
        </g>
      </motion.g>

      {/* Crisp foreground illustration */}
      <g>
        {TAIL_FEATHERS.map((d) => (
          <path key={`tail-${d.slice(0, 6)}`} d={d} fill="url(#phx-feather)" opacity={0.92} />
        ))}

        <g>
          {WING_FEATHERS.map((d) => (
            <path key={`wing-r-${d.slice(0, 6)}`} d={d} fill="url(#phx-feather)" />
          ))}
          <path d={WING_COVERT} fill="url(#phx-feather)" opacity={0.95} />
        </g>
        <g transform="translate(500,0) scale(-1,1)">
          {WING_FEATHERS.map((d) => (
            <path key={`wing-l-${d.slice(0, 6)}`} d={d} fill="url(#phx-feather)" />
          ))}
          <path d={WING_COVERT} fill="url(#phx-feather)" opacity={0.95} />
        </g>

        <path d={BODY_PATH} fill="url(#phx-body)" />
        <ellipse cx="250" cy="170" rx="26" ry="28" fill="url(#phx-body)" />
        {CREST_SPIKES.map((d) => (
          <path key={`crest-${d.slice(0, 6)}`} d={d} fill="#ff8a3d" />
        ))}
      </g>
    </motion.svg>
  )
}
