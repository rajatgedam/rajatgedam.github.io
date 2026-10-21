import { Section } from '../common/Section'
import { ClaudeUsagePanel } from './ClaudeUsagePanel'
import { GithubActivityPanel } from './GithubActivityPanel'

interface ActivitySectionProps {
  githubUsername: string
}

export function ActivitySection({ githubUsername }: ActivitySectionProps) {
  return (
    <Section id="activity" kicker="Activity" title="Recent activity">
      <div className="activity-grid">
        <div className="activity-column">
          <h3 className="activity-heading">GitHub contributions</h3>
          <GithubActivityPanel username={githubUsername} />
        </div>
        <div className="activity-column">
          <h3 className="activity-heading">Claude usage</h3>
          <ClaudeUsagePanel />
        </div>
      </div>
    </Section>
  )
}
