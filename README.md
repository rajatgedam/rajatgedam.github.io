# Rajat Gedam Portfolio (Revamped)

Modern single-page portfolio built with React, TypeScript, Vite, Framer Motion, and tsParticles.

This repository preserves the same core content from the legacy portfolio while introducing a reusable architecture for future content updates and a GitHub Pages deployment pipeline.

## What Is Implemented

- Rebuilt project with a modern React + TypeScript + Vite stack.
- Preserved content and assets from the original portfolio.
- Added reusable data-driven rendering for Experience and Projects.
- Implemented a dark navy visual system and responsive layout.
- Restored and upgraded animated background particles.
- Added CI-based deployment to GitHub Pages (`gh-pages` branch).
- Preserved the original project under `backup/original`.

## Tech Stack

- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS v4
- Framer Motion
- tsParticles (`@tsparticles/react`, `@tsparticles/slim`)
- ESLint + typescript-eslint
- GitHub Actions + `peaceiris/actions-gh-pages`

## Project Structure

```text
.
├── .github/workflows/deploy.yml
├── backup/original
├── public/assets
│   ├── illustrations
│   ├── projects
│   └── resume
├── src
│   ├── components
│   │   ├── common
│   │   └── sections
│   ├── data
│   ├── types
│   ├── App.tsx
│   └── index.css
├── package.json
└── vite.config.ts
```

## Prerequisites

- Node.js 22+ recommended
- npm 10+ recommended

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Default local URL is shown by Vite in terminal output.

## Available Commands

### Development

```bash
npm run dev
```

Starts the Vite dev server.

### Lint

```bash
npm run lint
```

Runs ESLint across the repo.

### Type Check

```bash
npm run typecheck
```

Runs TypeScript project references check.

### Production Build

```bash
npm run build
```

Builds production assets into `dist`.

### Preview Build

```bash
npm run preview
```

Serves the built `dist` output locally for validation.

### Manual GitHub Pages Deploy

```bash
npm run deploy
```

Runs build and publishes `dist` via the `gh-pages` CLI package.

## CI/CD Deployment (Recommended)

Deployment workflow file: `.github/workflows/deploy.yml`

Pipeline steps:

1. Checkout code
2. Setup Node 22
3. Install dependencies (`npm ci`)
4. Run lint
5. Run type check
6. Run build
7. Publish `dist` to `gh-pages`

Trigger:

- Push to `main`
- Manual dispatch from GitHub Actions UI

## How the App Works

### Typed content model

- Shared interfaces live in `src/types/portfolio.ts`.
- All profile, project, and experience content adheres to these types.

### Data-driven sections

- Profile data: `src/data/profile.ts`
- Experience list: `src/data/experience.ts`
- Projects list: `src/data/projects.ts`

UI sections map over these arrays/objects, so adding content usually requires data-only edits.

### Section composition

- Common wrappers in `src/components/common`.
- Feature sections in `src/components/sections`.
- App orchestration in `src/App.tsx`.

`App.tsx` wires navigation, active-section tracking, hero/contact CTAs, and section rendering.

### Background particles

- Implemented in `src/components/BackgroundParticles.tsx`.
- Uses tsParticles slim engine.
- Honors reduced-motion preferences for accessibility.

## Content Maintenance

### Add a new project

1. Edit `src/data/projects.ts`.
2. Append a `ProjectItem` object.
3. Add the image under `public/assets/projects`.
4. Run validation commands.

Required fields:

- `id`
- `title`
- `description`
- `image`
- `technologies`

Optional fields:

- `site`
- `repo`

### Add a new experience

1. Edit `src/data/experience.ts`.
2. Append an `ExperienceItem` object.
3. Run validation commands.

Required fields:

- `id`
- `role`
- `company`
- `period`
- `location`
- `summary`
- `tools`

### Update profile/contact info

Edit `src/data/profile.ts`.

## Assets

- Project images: `public/assets/projects`
- Resume PDF: `public/assets/resume/RajatGedamResume.pdf`
- SVG illustrations: `public/assets/illustrations`

## Notes

- `vite.config.ts` uses `base: process.env.VITE_BASE_PATH ?? '/'` to support flexible build base path handling.
- Build can show non-blocking Lightning CSS warnings for Tailwind at-rules, but production bundle generation remains successful.

## Verification Sequence

Use this command chain before publishing changes:

```bash
npm run lint && npm run typecheck && npm run build
```

## Detailed Implementation Record

For full end-to-end implementation details, decisions, and explanation of the architecture, see `implementationplan.md`.
