# Project Structure

Personal portfolio and blog for Victor Hempel-Mydtskov. Built with Next.js App Router, React, Tailwind CSS, and MDX. Content is statically generated at build time.

## File Tree

```text
portfolio/
├── .agents/
│   ├── project-structure.md
│   ├── projects-feature-plan.md
│   ├── reading-list-feature.md
│   ├── upgrade-plan.md
│   └── deployment.md
├── app/
│   ├── layout.tsx                    # Root layout, metadata, fonts, theme, nav/footer
│   ├── page.tsx                      # Home profile and introduction
│   ├── config.ts                     # Site metadata and social links
│   ├── global.css                    # Theme tokens, prose, links, breakouts
│   ├── error.tsx                     # Client error boundary
│   ├── not-found.tsx                 # Styled 404 page
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── blog/
│   │   ├── page.tsx                  # Blog index
│   │   └── [slug]/page.tsx           # Blog article and metadata
│   ├── projects/
│   │   ├── page.tsx                  # Project index
│   │   ├── project-data.ts           # Project metadata types
│   │   └── [slug]/page.tsx           # Project case study
│   ├── reading/
│   │   ├── page.tsx                  # Reading list
│   │   └── reading-data.tsx          # Books and takeaways
│   ├── feed/[format]/route.ts        # RSS, Atom, and JSON feeds
│   ├── og/route.tsx                  # Branded dynamic Open Graph image
│   ├── components/
│   │   ├── caption.tsx
│   │   ├── compare.tsx               # Accessible before/after image slider
│   │   ├── footer.tsx                # Server-rendered footer
│   │   ├── image-grid.tsx
│   │   ├── mdx.tsx                   # MDX components and plugins
│   │   ├── nav.tsx                   # Server nav shell
│   │   ├── section.tsx               # Shared headings and navigation links
│   │   ├── text-link.tsx             # Internal/external inline links
│   │   ├── theme-switch.tsx          # Theme provider and half-circle toggle
│   │   ├── tweet.tsx
│   │   ├── tweet.css
│   │   └── youtube.tsx
│   └── lib/posts.ts                  # MDX loading, frontmatter parsing, sorting, dates
├── assets/og/                        # Static TTF fonts used by Satori
├── content/
│   ├── blog/*.mdx
│   └── projects/*.mdx
├── public/
│   ├── favicons/
│   ├── projects/                     # Project photography and diagrams
│   └── ...                           # Profile images and blog media
├── tailwind.config.js
├── next.config.js
└── package.json
```

## Content Pipeline

- Blog and project articles live in `content/blog/` and `content/projects/` as MDX with YAML-style frontmatter.
- `app/lib/posts.ts` reads and parses frontmatter at build time. Project arrays, years, and featured flags are converted to typed values.
- Blog and project detail routes use `next-mdx-remote/rsc`, `remark-math`, and `rehype-katex`.
- MDX components include optimized images, optional wide/breakout figures, comparison sliders, callouts, captions, tables, code highlighting, YouTube, and tweet embeds.

## Theme and Design

- Fonts: Geist Sans for site text, Geist Mono for metadata and code.
- Light and dark theme colors are CSS custom properties in `app/global.css`, consumed by Tailwind utilities.
- `next-themes` provides class-based theming and system preference support. `ThemeSwitch` keeps the original local preference control and half-circle icon.
- Links, nav indicators, arrows, project images, and theme icons use restrained transitions and respect reduced-motion preferences.

## Routes

- `/` — profile, selected projects, and latest writing.
- `/projects` and `/projects/[slug]` — project index and case studies.
- `/blog` and `/blog/[slug]` — blog index and articles.
- `/reading` — categorized books and takeaways.
- `/og?title=...` — dynamic Open Graph image.
- `/rss.xml`, `/atom.xml`, `/feed.json` — feed formats, routed through rewrites.

All content routes are statically generated. The photo-gallery template route and its Unsplash placeholders have been removed.

## Commands

```bash
pnpm dev
pnpm build
pnpm start
```
