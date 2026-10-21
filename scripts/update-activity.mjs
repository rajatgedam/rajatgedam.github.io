#!/usr/bin/env node
// Refreshes the two activity calendars on the site and (unless --no-deploy is
// passed) commits and pushes the data so CI redeploys.
//
//   npm run activity:export   -> refresh the JSON files only (review locally)
//   npm run activity:update   -> refresh, commit, push to origin/main
//
// Claude data: per-day counts of human-typed prompts from local transcripts.
// GitHub data: your public contribution calendar plus commits you authored in
// private repos you own (GitHub's own graph omits those unless the profile's
// "Include private contributions" setting is on). Needs the `gh` CLI logged in.
//
// Only per-day counts are stored. No prompt text, repo names, or paths.

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const claudeFile = join(repoRoot, 'src', 'data', 'claude-usage.json')
const githubFile = join(repoRoot, 'src', 'data', 'github-activity.json')
const projectsDir = join(process.env.CLAUDE_CONFIG_DIR ?? join(homedir(), '.claude'), 'projects')
const deploy = !process.argv.includes('--no-deploy')

const pad = (n) => String(n).padStart(2, '0')
const localDay = (iso) => {
  const d = new Date(iso)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
const utcDay = (iso) => new Date(iso).toISOString().slice(0, 10)

// Claude Code prunes old transcripts and you may use more than one machine,
// and repos can be deleted, so never lower a day's count: merge with the
// already-published data and keep the larger value.
function writeMerged(file, metric, fresh) {
  const existing = existsSync(file) ? (JSON.parse(readFileSync(file, 'utf8')).days ?? {}) : {}
  const days = { ...existing }
  for (const [day, count] of Object.entries(fresh)) {
    days[day] = Math.max(days[day] ?? 0, count)
  }
  const sorted = Object.fromEntries(Object.entries(days).sort(([a], [b]) => a.localeCompare(b)))
  const changed = JSON.stringify(existing) !== JSON.stringify(sorted)
  if (changed || !existsSync(file)) {
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(
      file,
      `${JSON.stringify({ metric, generatedAt: new Date().toISOString(), days: sorted }, null, 2)}\n`,
    )
  }
  const total = Object.values(sorted).reduce((a, b) => a + b, 0)
  return { changed, activeDays: Object.keys(sorted).length, total }
}

// ---------- Claude ----------

function* transcriptFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* transcriptFiles(full)
    else if (entry.name.endsWith('.jsonl')) yield full
  }
}

function exportClaude() {
  if (!existsSync(projectsDir)) {
    console.warn(`Claude: no transcripts at ${projectsDir}, skipping.`)
    return false
  }
  // Count prompts the human actually typed (origin.kind === 'human'), skipping
  // tool results, task notifications and sidechain/subagent traffic.
  const fresh = {}
  for (const file of transcriptFiles(projectsDir)) {
    for (const line of readFileSync(file, 'utf8').split('\n')) {
      if (!line.includes('"type":"user"')) continue
      let entry
      try {
        entry = JSON.parse(line)
      } catch {
        continue
      }
      if (entry.type !== 'user' || entry.isSidechain || entry.origin?.kind !== 'human') continue
      if (!entry.timestamp) continue
      const day = localDay(entry.timestamp)
      fresh[day] = (fresh[day] ?? 0) + 1
    }
  }
  const r = writeMerged(claudeFile, 'prompts', fresh)
  console.log(`Claude: ${r.activeDays} active days, ${r.total} prompts. ${r.changed ? 'Updated.' : 'No change.'}`)
  return r.changed
}

// ---------- GitHub ----------

const gh = (...args) =>
  JSON.parse(execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }))

function exportGithub() {
  try {
    execFileSync('gh', ['auth', 'status'], { stdio: 'ignore' })
  } catch {
    console.warn('GitHub: `gh` is not installed or not logged in, skipping.')
    return false
  }

  const viewer = gh(
    'api',
    'graphql',
    '-f',
    'query={ viewer { login contributionsCollection { restrictedContributionsCount contributionCalendar { weeks { contributionDays { date contributionCount } } } } } }',
  ).data.viewer
  const login = viewer.login

  // Contributions exactly as GitHub counts them.
  const fresh = {}
  for (const week of viewer.contributionsCollection.contributionCalendar.weeks) {
    for (const day of week.contributionDays) {
      if (day.contributionCount > 0) fresh[day.date] = day.contributionCount
    }
  }
  const counted = Object.values(fresh).reduce((a, b) => a + b, 0)

  // Add commits you authored in private repos you own. They are absent from
  // the calendar unless the profile's private-contributions toggle is on, in
  // which case GitHub already counts them (restrictedContributionsCount > 0)
  // and adding them again would double count, so skip this step then.
  let privateCommits = 0
  if (viewer.contributionsCollection.restrictedContributionsCount === 0) {
    const since = new Date()
    since.setFullYear(since.getFullYear() - 1)
    const repos = gh('api', '--paginate', 'user/repos?affiliation=owner&visibility=private&per_page=100')
    for (const repo of repos) {
      let commits
      try {
        commits = gh(
          'api',
          '--paginate',
          `repos/${repo.full_name}/commits?since=${since.toISOString()}&per_page=100`,
        )
      } catch {
        continue // empty repo, or no access
      }
      for (const commit of commits) {
        // `author` is the GitHub account the commit email is linked to. Filtering
        // on it (not the API's author= param, which misses older noreply emails)
        // also leaves out commits tied to other accounts.
        if (commit.author?.login !== login) continue
        const day = utcDay(commit.commit.author.date)
        fresh[day] = (fresh[day] ?? 0) + 1
        privateCommits += 1
      }
    }
  }

  const r = writeMerged(githubFile, 'contributions', fresh)
  console.log(
    `GitHub: ${counted} counted by GitHub + ${privateCommits} private-repo commits. ` +
      `${r.activeDays} active days. ${r.changed ? 'Updated.' : 'No change.'}`,
  )
  return r.changed
}

// ---------- run ----------

const changedFiles = []
if (exportClaude()) changedFiles.push('src/data/claude-usage.json')
if (exportGithub()) changedFiles.push('src/data/github-activity.json')

if (!deploy) {
  console.log('Skipping deploy (--no-deploy). Review locally, then run: npm run activity:update')
  process.exit(0)
}
if (changedFiles.length === 0) {
  console.log('Nothing to deploy.')
  process.exit(0)
}

const git = (...args) => execFileSync('git', args, { cwd: repoRoot, stdio: 'inherit' })
git('add', ...changedFiles)
git('commit', '-m', 'chore: update activity calendars', '--', ...changedFiles)
git('push', 'origin', 'main')
console.log('Pushed. GitHub Actions will redeploy the site in about a minute.')
