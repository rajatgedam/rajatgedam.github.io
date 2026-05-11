import type { PropsWithChildren } from 'react'
import clsx from 'clsx'

interface SectionProps extends PropsWithChildren {
  id: string
  kicker?: string
  title?: string
  subtitle?: string
  className?: string
}

export function Section({
  id,
  kicker,
  title,
  subtitle,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={clsx('section', className)}>
      {kicker || title || subtitle ? (
        <header className="section-head">
          {kicker ? <p className="section-kicker">{kicker}</p> : null}
          {title ? <h2 className="section-title">{title}</h2> : null}
          {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
        </header>
      ) : null}
      {children}
    </section>
  )
}