import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export function BackgroundParticles() {
  const [ready, setReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: 'transparent' },
      detectRetina: true,
      fpsLimit: 90,
      particles: {
        number: {
          value: reducedMotion ? 30 : 110,
          density: { enable: true, area: 1000 },
        },
        // Black dots and lines on the site's light background, rather than
        // the old dark-theme's colorful particles on navy.
        color: {
          value: '#15140f',
        },
        links: {
          enable: true,
          distance: 140,
          opacity: 0.18,
          width: 1,
          color: '#15140f',
        },
        move: {
          enable: true,
          speed: reducedMotion ? 0.3 : 1.4,
          random: true,
          outModes: { default: 'out' as const },
        },
        size: {
          value: { min: 1, max: 2.4 },
        },
        opacity: {
          value: { min: 0.12, max: 0.35 },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: !reducedMotion,
            mode: 'grab' as const,
          },
          resize: { enable: true },
        },
        modes: {
          grab: {
            distance: 160,
            links: {
              opacity: 0.3,
            },
          },
        },
      },
    }),
    [reducedMotion],
  )

  if (!ready) {
    return null
  }

  return <Particles id="background-particles" className="particles-layer" options={options} />
}
