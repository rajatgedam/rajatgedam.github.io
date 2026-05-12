import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, FolderGit2 } from 'lucide-react'
import { Section } from '../common/Section'
import { TagList } from '../common/TagList'
import type { ProjectItem } from '../../types/portfolio'

interface ProjectsSectionProps {
  items: ProjectItem[]
}

export function ProjectsSection({ items }: ProjectsSectionProps) {
  const [showArchived, setShowArchived] = useState(false)

  const hasArchived = useMemo(() => items.some((item) => item.archived), [items])

  const visibleItems = useMemo(
    () => items.filter((item) => showArchived || !item.archived),
    [items, showArchived],
  )

  return (
    <Section
      id="projects"
      kicker="Projects"
      title="Selected engineering work"
      titleHint="Add project objects in src/data/projects.ts to publish new cards without UI changes."
    >
      {hasArchived ? (
        <div className="section-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowArchived((prev) => !prev)}
          >
            {showArchived ? 'Hide Archived Projects' : 'Show Archived Projects'}
          </button>
        </div>
      ) : null}

      <div className="project-grid">
        {visibleItems.map((project, index) => (
          <motion.article
            key={project.id}
            className="panel project-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
          >
            <div className="project-image-wrap">
              <img
                src={project.image}
                alt={`Preview of ${project.title}`}
                loading="lazy"
                className="project-image"
              />
            </div>

            <div className="project-content">
              <div className="timeline-head">
                <h3>{project.title}</h3>
                {project.period ? <span className="period-chip">{project.period}</span> : null}
              </div>
              <p className="body-copy">{project.description}</p>
              <TagList tags={project.technologies} />

              <div className="project-links">
                {project.repo ? (
                  <a href={project.repo} target="_blank" rel="noreferrer" className="project-link">
                    <FolderGit2 size={16} />
                    Repository
                  </a>
                ) : null}
                {project.site ? (
                  <a href={project.site} target="_blank" rel="noreferrer" className="project-link">
                    <ExternalLink size={16} />
                    Live Site
                  </a>
                ) : null}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}