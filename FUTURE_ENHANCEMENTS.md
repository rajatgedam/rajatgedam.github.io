# Future Enhancements Plan

## Purpose

Track high-value upgrades for the portfolio experience, prioritize implementation order, and keep future iterations scoped and intentional.

## Candidate Ideas

1. Fun tab mini-games and interactive experiments
2. Better project storytelling with per-project deep dives
3. Resume timeline visual with milestone animations
4. Lightweight analytics for visitor interaction patterns
5. Theme presets (same design system, alternate palettes)
6. Accessibility hardening and keyboard-only UX passes
7. Performance budgets and Lighthouse score gates in CI

## Fun Tab Research (React + TypeScript + Vite)

Online scan summary:

1. Kaboom.js
- Why it is easy: simple API (`kaboom()`, `add()`, `onKeyPress()`), fast to prototype arcade loops.
- Good fit: flappy/dino-like side scrollers and one-button mechanics.
- Tradeoff: adds a dedicated game engine dependency and API surface to maintain.

2. Kontra.js
- Why it is easy: lightweight micro-library focused on game loop, input, sprites.
- Good fit: very small bundle impact and quick prototypes.
- Tradeoff: lower-level composition than full engines, still another dependency.

3. Pure Canvas + React wrapper (chosen for first iteration)
- Why it is easy here: zero new dependencies, fully controlled logic in one TS component.
- Good fit: simple endless games, custom styling to match the portfolio design language.
- Tradeoff: more custom game logic maintenance compared with an engine.

## Decision for Now

Implement a "Fun" section with an endless Flappy-style mini-game using canvas and React only, then evaluate if moving to Kaboom or Kontra is worthwhile for future mini-games.

## Initial Scope (In Progress)

1. Add a `Fun` tab to navigation.
2. Add a `Fun` section component.
3. Implement endless one-button game loop:
- Gravity + flap physics
- Procedural obstacles
- Increasing difficulty
- Score + best score persistence in local storage
- Keyboard and touch controls
4. Keep visuals consistent with the navy portfolio theme.

## Future Iterations for Fun Tab

1. Add game modes:
- Dino-style runner mode
- Daily challenge seed mode

2. Add polish:
- Sound effects and mute toggle
- Particle bursts on score milestones
- Better game-over transitions

3. Add social/replay:
- Share best score link
- Optional global leaderboard backed by a serverless endpoint

4. Add accessibility:
- Reduced-motion gameplay mode
- High-contrast option
- Clear keyboard-only affordances

## Implementation Notes

- Keep game code isolated under `src/components/sections` or a dedicated `src/components/fun` folder.
- Avoid heavy dependencies unless adding multiple games.
- Keep runtime state in refs to prevent unnecessary React re-renders each frame.
- Continue validating with `npm run lint`, `npm run typecheck`, and `npm run build`.
