import { motion } from 'framer-motion'
import { Section } from '../common/Section'
import { TagList } from '../common/TagList'
import type { ExperienceItem } from '../../types/portfolio'

interface ExperienceSectionProps {
  items: ExperienceItem[]
}

export function ExperienceSection({ items }: ExperienceSectionProps) {
  return (
    <Section
      id="experience"
      kicker="Experience"
      title="Where I have delivered impact"
      subtitle="Add new experience entries in src/data/experience.ts and this section updates automatically."
    >
      <div className="timeline-grid">
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            className="panel timeline-item"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
          >
            <div className="timeline-head">
              <div>
                <h3>{item.role}</h3>
                <p className="muted">
                  {item.company} · {item.location}
                </p>
              </div>
              <span className="period-chip">{item.period}</span>
            </div>

            <ul className="bullet-list">
              {item.summary.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <TagList tags={item.tools} />
          </motion.article>
        ))}
      </div>
    </Section>
  )
}