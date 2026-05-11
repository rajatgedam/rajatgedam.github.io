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
          value: reducedMotion ? 24 : 72,
          density: { enable: true, area: 1200 },
        },
        color: {
          value: ['#6ca3ff', '#7eddd3', '#ffd480', '#80b9ff'],
        },
        links: {
          enable: true,
          distance: 130,
          opacity: 0.22,
          width: 1,
          color: '#6ca3ff',
        },
        move: {
          enable: true,
          speed: reducedMotion ? 0.2 : 0.55,
          random: true,
          outModes: { default: 'out' as const },
        },
        size: {
          value: { min: 1, max: 3 },
        },
        opacity: {
          value: { min: 0.2, max: 0.7 },
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
              opacity: 0.45,
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