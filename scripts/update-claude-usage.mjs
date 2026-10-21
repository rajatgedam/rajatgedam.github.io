#!/usr/bin/env node
// Builds src/data/claude-usage.json from local Claude Code transcripts, and
// (unless --no-deploy is passed) commits and pushes it so CI redeploys the site.
//
//   npm run claude:export   -> refresh the JSON only (review locally first)
//   npm run claude:update   -> refresh the JSON, commit, push to origin/main
//
// Only per-day counts of human-typed prompts are stored. No prompt text,
// project names, or paths ever leave the transcripts.

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dataFile = join(repoRoot, 'src', 'data', 'claude-usage.json')
const projectsDir = join(process.env.CLAUDE_CONFIG_DIR ?? join(homedir(), '.claude'), 'projects')
const deploy = !process.argv.includes('--no-deploy')

const localDay = (iso) => {
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function* transcriptFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* transcriptFiles(full)
    else if (entry.name.endsWith('.jsonl')) yield full
  }
}

if (!existsSync(projectsDir)) {
  console.error(`No Claude transcripts found at ${projectsDir}`)
  process.exit(1)
}

// Count prompts the human actually typed (origin.kind === 'human'), skipping
// tool results, task notifications and sidechain/subagent traffic.
const fresh = {}
let files = 0
for (const file of transcriptFiles(projectsDir)) {
  files += 1
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

// Claude Code prunes old transcripts and you may use more than one machine,
// so never lower a day's count: merge with what's already published.
let existing = {}
if (existsSync(dataFile)) {
  existing = JSON.parse(readFileSync(dataFile, 'utf8')).days ?? {}
}
const days = { ...existing }
for (const [day, count] of Object.entries(fresh)) {
  days[day] = Math.max(days[day] ?? 0, count)
}
const sorted = Object.fromEntries(Object.entries(days).sort(([a], [b]) => a.localeCompare(b)))

const previous = existsSync(dataFile) ? JSON.stringify(JSON.parse(readFileSync(dataFile, 'utf8')).days) : ''
const changed = previous !== JSON.stringify(sorted)

if (changed || !existsSync(dataFile)) {
  mkdirSync(dirname(dataFile), { recursive: true })
  writeFileSync(
    dataFile,
    `${JSON.stringify({ metric: 'prompts', generatedAt: new Date().toISOString(), days: sorted }, null, 2)}\n`,
  )
}

const total = Object.values(sorted).reduce((a, b) => a + b, 0)
console.log(`Scanned ${files} transcript(s): ${Object.keys(sorted).length} active days, ${total} prompts.`)
console.log(changed ? 'Usage data updated.' : 'No new activity since last export.')

if (!deploy) {
  console.log('Skipping deploy (--no-deploy). Review locally, then run: npm run claude:update')
  process.exit(0)
}

const git = (...args) => execFileSync('git', args, { cwd: repoRoot, stdio: 'inherit' })
if (!changed) {
  console.log('Nothing to deploy.')
  process.exit(0)
}
git('add', 'src/data/claude-usage.json')
git('commit', '-m', 'chore: update Claude usage calendar data', '--', 'src/data/claude-usage.json')
git('push', 'origin', 'main')
console.log('Pushed. GitHub Actions will redeploy the site in about a minute.')
