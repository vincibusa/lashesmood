# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js App Router pages/layouts and route handlers (`src/app/api/*/route.ts`).
- `src/components`: feature UI sections (`home`, `products`, `faq`, `collections`, `contatti`, `come-funziona`) plus shared primitives in `src/components/ui`.
- `src/lib`: integrations/utilities (Shopify client, queries, animation helpers); `src/context`: React providers; `src/hooks`: custom hooks; `src/types`: shared TypeScript models.
- `public/`: static assets (icons, images). Root config files (`next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `firebase.json`) define runtime and tooling behavior.

## Build, Test, and Development Commands
- `npm run dev`: start local development server with Turbopack at `http://localhost:3000`.
- `npm run build`: create production build artifacts.
- `npm run start`: run the production server (after `npm run build`).
- `npm run lint`: run ESLint (`next/core-web-vitals` + TypeScript rules).
- `npx tsc --noEmit`: recommended type-check pass before opening a PR.

## Coding Style & Naming Conventions
- TypeScript is `strict`; prefer explicit types at API boundaries and shared utility functions.
- Use the path alias `@/*` for imports from `src` (for example, `@/components/home/hero-section`).
- File naming: kebab-case for component files (`before-after-section.tsx`), PascalCase for exported component symbols.
- Route directory names map directly to URL slugs in `src/app`.
- Preserve local file style (indentation/quotes) and avoid formatting-only commits across unrelated files.

## Testing Guidelines
- No automated test suite is currently configured in `package.json`.
- Minimum validation for each change: `npm run lint`, `npx tsc --noEmit`, and manual smoke checks of affected flows (home, product/cart, account/auth, and touched API routes).
- If adding tests, use `*.test.ts(x)` or `__tests__/` and add a runnable script to `package.json`.

## Commit & Pull Request Guidelines
- Current history uses short, lowercase subjects (for example, `fix`, `build`, `cambio colori`).
- Keep commit subjects imperative and concise; prefer scoped messages when possible (example: `fix: cart cookie parsing`).
- PRs should include: summary, reason for change, impacted routes/components, validation steps, and screenshots/GIFs for UI updates.
- Link related issues/tasks and call out env/config updates explicitly.

## Security & Configuration Tips
- Never commit secrets; `.env*` is gitignored.
- Keep sensitive tokens server-side and verify required env vars before release (especially Shopify-related settings).
