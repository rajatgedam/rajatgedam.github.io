import { motion } from 'framer-motion'
import { FolderGit2 } from 'lucide-react'
import { ActivityCalendar } from 'react-activity-calendar'
import 'react-activity-calendar/tooltips.css'
import activity from '../../data/github-activity.json'
import { buildRollingData, calendarTheme } from '../../lib/activityData'

interface GithubActivityPanelProps {
  username: string
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
}

// Data comes from github-activity.json (public contributions plus commits in
// private repos), refreshed by `npm run activity:update`.
export function GithubActivityPanel({ username }: GithubActivityPanelProps) {
  const { data, total } = buildRollingData(activity.days, 6)

  return (
    <motion.div className="panel github-activity" {...fadeInUp}>
      <div className="github-activity-calendar">
        <ActivityCalendar
          data={data}
          colorScheme="light"
          theme={calendarTheme}
          fontSize={13}
          blockSize={11}
          blockMargin={4}
          labels={{ totalCount: `${total} contributions in the last 6 months` }}
          tooltips={{
            activity: {
              text: (a) => `${a.count} contribution${a.count === 1 ? '' : 's'} on ${a.date}`,
            },
          }}
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
  )
}
