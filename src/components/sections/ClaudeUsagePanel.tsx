import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { ActivityCalendar } from 'react-activity-calendar'
import 'react-activity-calendar/tooltips.css'
import usage from '../../data/claude-usage.json'
import { buildRollingData, calendarTheme } from '../../lib/activityData'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
}

export function ClaudeUsagePanel() {
  const { data, total } = buildRollingData(usage.days, 3)

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
          labels={{ totalCount: `${total} prompts in the last 3 months` }}
          tooltips={{
            activity: {
              text: (activity) =>
                `${activity.count} prompt${activity.count === 1 ? '' : 's'} on ${activity.date}`,
            },
          }}
        />
      </div>
      <p className="activity-note">
        <Sparkles size={14} />
        Claude Code prompts, counted per day from local session history.
      </p>
    </motion.div>
  )
}
