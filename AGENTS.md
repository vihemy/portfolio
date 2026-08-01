# AGENTS.md — vihemy.com

Personal portfolio & blog for Victor Hempel-Mydtskov, built with Next.js and deployed on Vercel.

## Quick Reference

| Item | Value |
|---|---|
| **URL** | https://vihemy.com |
| **Repo** | https://github.com/vihemy/portfolio |
| **Hosting** | Vercel (auto-deploy from GitHub) |
| **Package manager** | pnpm |
| **Node.js** | v22.12.0 (env), >=20.9 required for Next.js 16 |
| **Build** | `pnpm build` → Next.js static export |
| **Dev** | `pnpm dev` |
| **Format/Lint** | None configured |
| **Tests** | None configured |

## Tech Stack

- **Framework:** Next.js 14.2.6 (App Router only, no Pages Router)
- **UI:** React 18.3.1, Tailwind CSS 3.4.10
- **Language:** TypeScript 5.5.4 (`strict: false`)
- **Content:** MDX via `next-mdx-remote` (content in `/content/`)
- **Styling:** Tailwind CSS + `@tailwindcss/typography` + `geist` font
- **Math:** `remark-math` + `rehype-katex` + `katex`
- **Code highlighting:** `sugar-high`
- **Analytics:** `@vercel/analytics` + `@vercel/speed-insights`
- **Theme:** `next-themes` (dark/light with system preference)
- **Icons:** `react-icons` (FontAwesome 6)
- **RSS/Atom/JSON:** `feed`
- **OG images:** `next/og` (ImageResponse)

## Key Conventions

- **Server-first:** Components are RSC by default; only add `"use client"` when needed (interactivity, hooks, browser APIs)
- **MDX content:** Posts live in `/content/` as `.mdx` files with YAML frontmatter (title, publishedAt, summary, tags, image)
- **Frontmatter:** Parsed manually in `app/lib/posts.ts` (no library like gray-matter)
- **Theme colors:** Syntax highlighting variables in `global.css` use `--sh-*` custom properties
- **Routes:** All routes are statically generated (no SSR/ISR)
- **Static data:** Projects are hardcoded in `project-data.tsx` (not in content/)
- **Photos page:** Nav link is commented out, uses placeholder Unsplash photos

Full file tree and module details: `.agents/project-structure.md`

## Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
```

---

Detailed documentation in `.agents/`:
- `project-structure.md` — Full file tree and module details
- `upgrade-plan.md` — Breaking changes analysis and upgrade path
- `deployment.md` — GitHub + Vercel deployment pipeline
