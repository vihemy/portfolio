# Deployment Pipeline

## Overview

The site is deployed on **Vercel** with automatic deployment from **GitHub**.

| Detail | Value |
|---|---|
| Repository | `https://github.com/vihemy/portfolio` |
| Current branch | `website-update` (default branch) |
| Hosting | Vercel (Hobby plan assumed) |
| Deployment trigger | Push to GitHub → Vercel auto-deploy |
| Framework | Auto-detected as Next.js |
| Build command | `pnpm build` |
| Output | Static export (implicit via usage) |

## Git Remote

```
origin  https://github.com/vihemy/portfolio.git (fetch)
origin  https://github.com/vihemy/portfolio.git (push)
```

## CI/CD

- **No GitHub Actions** — no `.github/workflows/` directory exists
- **No vercel.json** — Vercel auto-detects Next.js and uses defaults
- **No tests** — no test framework or CI checks
- **No lint/format checks** — no ESLint or Prettier configured

Deployment is managed entirely by Vercel's GitHub integration. When code is pushed to the repo, Vercel automatically builds and deploys.

## Build & Deploy Process (Inferred)

1. Developer pushes to `website-update` branch
2. Vercel detects push via GitHub integration
3. Vercel runs `pnpm install` (using `pnpm-lock.yaml`)
4. Vercel runs `pnpm build` → `next build`
5. Static files generated to `.next/`
6. Vercel deploys static output

## Environment Variables

No `.env` file committed (in `.gitignore`). Environment variables would be set in Vercel dashboard if needed. Currently none are required — all config is in `app/config.ts`.

## Domain

- **Production:** https://vihemy.com
- **Vercel Preview:** Vercel generates preview URLs for each deployment

## Post-Upgrade Verification

After upgrading dependencies, verify:

1. `pnpm build` succeeds locally
2. Push to GitHub triggers Vercel build
3. Vercel build succeeds
4. Live site renders correctly:
   - Home page loads
   - Blog listing and posts render
   - Projects page renders
   - Feeds: `/rss.xml`, `/atom.xml`, `/feed.json`
   - OG images: `/og?title=Test`
   - Theme toggle works (dark/light)
   - Sitemap: `/sitemap.xml`
   - Robots: `/robots.txt`

## Rollback Plan

If Vercel deploy fails:
1. Revert the faulty commit locally
2. Force push to the branch (Vercel auto-redeploys)
3. Or use Vercel dashboard to promote a previous deployment

No database migrations or data loss risk — site is fully static.
