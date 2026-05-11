import { motion } from 'framer-motion'
import { Section } from '../common/Section'
import { TagList } from '../common/TagList'
import type { Profile } from '../../types/portfolio'

interface AboutSectionProps {
  profile: Profile
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5 },
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <Section
      id="about"
      kicker="About"
      title="Product-minded engineering with cloud depth"
      subtitle="Building practical systems with thoughtful UX, resilient architecture, and clear business impact."
    >
      <motion.div className="about-grid" {...fadeInUp}>
        <div className="panel">
          {profile.summary.map((paragraph) => (
            <p key={paragraph} className="body-copy">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="panel about-side">
          <img
            src="/assets/illustrations/about-promo.svg"
            alt="Illustration representing collaboration and modern software delivery"
            className="about-illustration"
            loading="lazy"
          />
          <h3>Core Skills</h3>
          <TagList tags={profile.skills} />
        </div>
      </motion.div>
    </Section>
  )
}