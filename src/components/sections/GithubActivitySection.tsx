import { motion } from 'framer-motion'
import { FolderGit2 } from 'lucide-react'
import { GitHubCalendar, type Props as GitHubCalendarProps } from 'react-github-calendar'
import 'react-github-calendar/tooltips.css'
import { Section } from '../common/Section'

interface GithubActivitySectionProps {
  username: string
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
}

// A monochrome ramp built from the site's own accent color instead of
// GitHub's default green, so the calendar reads as part of this design
// system rather than a bolted-on widget.
const calendarTheme = {
  light: ['#f2f0ea', '#cec6f7', '#9c86f2', '#6a4bee', '#3a2fef'],
}

// The component fetches a rolling last-12-months dataset by default; slice
// that down to a rolling last-6-months window using real date arithmetic
// (rather than comparing calendar-year month indices, which breaks across
// a year boundary) so this stays correct no matter when the page loads.
const selectLastSixMonths: GitHubCalendarProps['transformData'] = (contributions) => {
  const cutoff = new Date()
  cutoff.setMonth(cutoff.getMonth() - 6)
  return contributions.filter((activity) => new Date(activity.date) >= cutoff)
}

export function GithubActivitySection({ username }: GithubActivitySectionProps) {
  return (
    <Section id="activity" kicker="Activity" title="GitHub contributions">
      <motion.div className="panel github-activity" {...fadeInUp}>
        <div className="github-activity-calendar">
          <GitHubCalendar
            username={username}
            colorScheme="light"
            theme={calendarTheme}
            fontSize={13}
            blockSize={11}
            blockMargin={4}
            transformData={selectLastSixMonths}
            labels={{ totalCount: '{{count}} contributions in the last 6 months' }}
            errorMessage="Couldn't load GitHub activity right now."
          />
        </div>
        <a
          className="project-link"
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
        >
          <FolderGit2 size={16} />
          View full profile on GitHub
        </a>
      </motion.div>
    </Section>
  )
}
