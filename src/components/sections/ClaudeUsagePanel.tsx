import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { ActivityCalendar, type Activity } from 'react-activity-calendar'
import 'react-activity-calendar/tooltips.css'
import usage from '../../data/claude-usage.json'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
}

// Same ramp as the GitHub calendar so the two read as a pair.
const calendarTheme = {
  light: ['#f2f0ea', '#cec6f7', '#9c86f2', '#6a4bee', '#3a2fef'],
}

const toKey = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

// Builds a contiguous rolling 3-month window (the calendar needs every day,
// not just active ones) and buckets non-zero days into levels 1-4 by quartile
// of this window's own distribution, so the scale adapts as usage grows.
function buildThreeMonthData(days: Record<string, number>): { data: Activity[]; total: number } {
  const end = new Date()
  const start = new Date(end)
  start.setMonth(start.getMonth() - 3)

  const dates: string[] = []
  for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(toKey(d))
  }

  const nonZero = dates.map((date) => days[date] ?? 0).filter((count) => count > 0).sort((a, b) => a - b)
  const quantile = (q: number) => nonZero[Math.min(nonZero.length - 1, Math.floor(q * nonZero.length))]
  const [q1, q2, q3] = [quantile(0.25), quantile(0.5), quantile(0.75)]

  let total = 0
  const data = dates.map((date) => {
    const count = days[date] ?? 0
    total += count
    const level = count === 0 ? 0 : count <= q1 ? 1 : count <= q2 ? 2 : count <= q3 ? 3 : 4
    return { date, count, level }
  })
  return { data, total }
}

export function ClaudeUsagePanel() {
  const { data, total } = buildThreeMonthData(usage.days)

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
