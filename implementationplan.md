# Portfolio Revamp Implementation Plan

## 1. Objective

Revamp the legacy portfolio into a modern, maintainable, and deployable application while preserving the same core content and improving UI/UX.

Required outcomes that were implemented:

- Keep the same profile, projects, and experience content.
- Use a modern stack and folder structure.
- Create reusable, data-driven sections so new Project and Experience items can be added without changing layout components.
- Preserve and improve animated background effects.
- Apply a dark navy complementary visual style.
- Keep deployment compatible with GitHub Pages.
- Move the original project to a backup folder.

## 2. Final Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4 (imported and available)
- Framer Motion (entrance and mobile nav animations)
- tsParticles (background animation)
- ESLint + TypeScript checks
- GitHub Actions deployment to `gh-pages`

## 3. Repository Restructure and Backup

### What was done

- The legacy project was preserved in `backup/original`.
- The active project was replaced with a Vite + React + TypeScript structure.

### Why this matters

- The backup keeps source history and old implementation for reference.
- The new root structure keeps tooling simple for CI/CD and local development.

## 4. Architecture Overview

The app uses a content-data plus reusable-render-components pattern.

### 4.1 Type contracts

- Shared TypeScript interfaces are defined in `src/types/portfolio.ts`.
- Types include:
  - `Profile`
  - `ExperienceItem`
  - `ProjectItem`
  - `SocialLink`

How it works:

- Data modules must satisfy these interfaces.
- UI sections read typed arrays/objects and render predictably.
- This prevents schema drift when adding new content.

### 4.2 Data source modules

- `src/data/profile.ts`
- `src/data/experience.ts`
- `src/data/projects.ts`

How it works:

- These files are the single source of truth for content.
- To add a project/experience item, append to the array only.
- Components re-render new data automatically without structural code changes.

### 4.3 Reusable UI sections

- `src/components/sections/AboutSection.tsx`
- `src/components/sections/ExperienceSection.tsx`
- `src/components/sections/ProjectsSection.tsx`
- Shared blocks:
  - `src/components/common/Section.tsx`
  - `src/components/common/TagList.tsx`

How it works:

- `Section` standardizes headings, spacing, and section container behavior.
- `TagList` standardizes technology/skill tags.
- Experience and project sections consume typed lists, map over items, and render cards.

### 4.4 App composition and navigation

`src/App.tsx` orchestrates:

- Header and navigation (desktop and mobile).
- Active section tracking via `IntersectionObserver`.
- Hero, About, Experience, Projects, Contact sections.
- Social links and CTA wiring from typed data modules.

How it works:

- Navigation points to semantic section anchors.
- Observer updates active nav state based on viewport intersection.
- Mobile menu uses `AnimatePresence` and motion transitions for open/close.

### 4.5 Background animation

`src/components/BackgroundParticles.tsx` provides particle effects.

How it works:

- Initializes tsParticles engine with slim bundle.
- Uses navy-compatible particle/link colors.
- Detects `prefers-reduced-motion` and lowers particle count/speed.
- Keeps animation behind content with dedicated layered CSS.

### 4.6 Design system and theme

`src/index.css` contains custom theme and component styling.

How it works:

- Establishes dark navy mood and complementary accents.
- Defines reusable classes for cards, buttons, nav, sections, and responsive behavior.
- Includes reduced motion support for accessibility.

## 5. Tooling and Deployment

### 5.1 NPM scripts

Defined in `package.json`:

- `npm run dev` -> local Vite development server
- `npm run lint` -> ESLint checks
- `npm run typecheck` -> TypeScript project checks (`tsc -b --pretty false`)
- `npm run build` -> TypeScript build + Vite production build
- `npm run preview` -> preview built assets locally
- `npm run deploy` -> manual build + publish `dist` using `gh-pages`

### 5.2 GitHub Actions workflow

`.github/workflows/deploy.yml`:

- Triggers on push to `main` and manual dispatch.
- Runs install, lint, typecheck, and build.
- Publishes `dist` to `gh-pages` using `peaceiris/actions-gh-pages`.

### 5.3 Vite base path

- `vite.config.ts` uses `base: process.env.VITE_BASE_PATH ?? '/'`.
- This enables controlled base-path behavior during CI and local builds.

## 6. Build Issue and Resolution

### Issue encountered

- A temporary config change set `cssMinify: 'esbuild'` in `vite.config.ts`.
- Build failed because `esbuild` was not installed as a direct dependency in this environment.

### Resolution applied

- Removed the `cssMinify` override and reverted to default Vite behavior.
- Re-ran:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
- All commands succeeded.

## 7. How to Extend Content (Reusable Flow)

### Add a Project

1. Open `src/data/projects.ts`.
2. Append a new object in `projects` that matches `ProjectItem`.
3. Add a matching image in `public/assets/projects`.
4. Build/test to validate.

No component changes are required unless you want a new visual field.

### Add Experience

1. Open `src/data/experience.ts`.
2. Append a new object in `experience` matching `ExperienceItem`.
3. Build/test to validate.

No layout changes are required for standard entries.

## 8. Assets and Static Content

- Project images: `public/assets/projects`
- Resume: `public/assets/resume/RajatGedamResume.pdf`
- Illustrations: `public/assets/illustrations`

## 9. Validation Snapshot

Most recent successful validation sequence:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run build`

Current state: deployable and CI-compatible.

## 10. Maintenance Notes

- Keep data edits isolated to `src/data/*` when possible.
- Keep type updates in sync in `src/types/portfolio.ts` if schema evolves.
- If backup content is retained long-term, keep lint ignore rules excluding `backup/original/**`.
- For future visual refactors, preserve accessibility and reduced-motion support.