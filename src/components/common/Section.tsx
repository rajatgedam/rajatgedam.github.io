import type { PropsWithChildren } from 'react'
import clsx from 'clsx'

interface SectionProps extends PropsWithChildren {
  id: string
  kicker?: string
  title?: string
  titleHint?: string
  subtitle?: string
  className?: string
}

export function Section({
  id,
  kicker,
  title,
  titleHint,
  subtitle,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={clsx('section', className)}>
      {kicker || title || subtitle ? (
        <header className="section-head">
          {kicker ? <p className="section-kicker">{kicker}</p> : null}
          {title ? (
            <div className="section-title-row">
              <h2 className="section-title">{title}</h2>
              {titleHint ? (
                <button
                  type="button"
                  className="section-hint"
                  data-tooltip={titleHint}
                  aria-label="Section authoring hint"
                  title={titleHint}
                >
                  ?
                </button>
              ) : null}
            </div>
          ) : null}
          {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
        </header>
      ) : null}
      {children}
    </section>
  )
}