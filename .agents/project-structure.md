# Project Structure

## File Tree

```
portfolio/
├── AGENTS.md                         # AI agent documentation
├── .agents/                          # Agent context files
│   ├── project-structure.md          # This file
│   ├── projects-feature-plan.md      # /projects case-study feature plan
│   ├── upgrade-plan.md               # Dependency upgrade analysis
│   └── deployment.md                 # Deployment pipeline docs
├── app/
│   ├── layout.tsx                    # Root layout with metadata, ThemeProvider, Navbar, Footer
│   ├── page.tsx                      # Home page — profile image, intro text, social links
│   ├── config.ts                     # Site metadata (baseUrl, title, description) + socialLinks
│   ├── global.css                    # Tailwind directives, prose styles, --sh-* variables
│   ├── error.tsx                     # Error boundary (Client Component)
│   ├── not-found.tsx                 # 404 page
│   ├── robots.ts                     # robots.txt generator
│   ├── sitemap.ts                    # Dynamic sitemap.xml generator
│   ├── blog/
│   │   ├── page.tsx                  # Blog index — lists all posts sorted by date desc
│   │   └── [slug]/
│   │       └── page.tsx              # Blog post — MDX rendering + JSON-LD structured data
│   ├── projects/
│   │   ├── page.tsx                  # Projects listing page
│   │   └── project-data.tsx          # Project[] static data (title, year, description, url)
│   ├── photos/
│   │   └── page.tsx                  # Photo gallery — demo with ImageGrid, placeholder images
│   ├── feed/
│   │   └── [format]/
│   │       └── route.ts              # Multi-format feed generator (rss.xml, atom.xml, feed.json)
│   ├── og/
│   │   └── route.tsx                 # Dynamic OG image generator (ImageResponse)
│   ├── components/
│   │   ├── mdx.tsx                   # CustomMDX with sugar-high, katex, custom components
│   │   ├── nav.tsx                   # Navbar (RSC) — site title, nav links, ThemeSwitch
│   │   ├── footer.tsx                # Footer (Client) — copyright, social icons, RSS link
│   │   ├── theme-switch.tsx          # ThemeProvider + ThemeSwitch toggle (Client)
│   │   ├── image-grid.tsx            # Responsive image grid (2/3/4 columns)
│   │   ├── caption.tsx               # Text caption with react-wrap-balancer
│   │   ├── youtube.tsx               # YouTube embed wrapper (Client)
│   │   ├── tweet.tsx                 # Tweet embed — fetches tweet via API (RSC)
│   │   └── tweet.css                 # Tweet component styles
│   └── lib/
│       └── posts.ts                  # MDX file reader, frontmatter parser, date formatter
├── content/
│   ├── from-unity-to-web-development.mdx   # Blog post (Dec 2024)
│   └── reading-is-rereading.mdx            # Blog post (Nov 2024)
├── public/
│   ├── favicon.ico                   # Standard favicon
│   ├── favicons/                     # Modern favicon assets (SVG, PNG, webmanifest)
│   ├── profile.png, kc_profil.jpg    # Profile images
│   ├── opengraph-image.png           # Default OG image
│   ├── DOM.png, HierarchyWindow.png, TMPro.png  # Blog post images
│   ├── logo.png                      # Site logo
│   ├── dark-mode-demo.png, light-mode-demo.png  # Theme demo images
│   └── photos/                       # Photo gallery images (photo1–photo6.jpg)
├── next.config.js                    # Rewrites (feed URLs), reactStrictMode, swcMinify
├── tailwind.config.js                # Dark mode class, content paths, Geist fonts, prose config
├── postcss.config.js                 # PostCSS with Tailwind + Autoprefixer
├── tsconfig.json                     # TypeScript config (strict: false, moduleResolution: node)
├── package.json                      # Dependencies and scripts
├── pnpm-lock.yaml                    # Lock file (lockfileVersion 9.0)
└── .gitignore                        # Ignores: node_modules, .next, .vercel, .env
```

## Module Details

### Home Page (`app/page.tsx`)
- RSC, no client interactivity
- Displays profile photo (grayscale → color on hover), name, intro paragraphs
- Links to LinkedIn and GitHub from `config.ts`

### Blog Content Pipeline
1. **Source:** `.mdx` files in `/content/` with YAML frontmatter (title, publishedAt, summary, tags, image)
2. **Parsing:** `app/lib/posts.ts` — manual frontmatter regex parser, reads filesystem at build time
3. **Rendering:** `app/blog/[slug]/page.tsx` → `CustomMDX` component (`app/components/mdx.tsx`)
4. **MDX:** `next-mdx-remote/rsc` with remark-math + rehype-katex plugins
5. **Custom MDX components:** Image, ImageGrid, CustomLink, Code (sugar-high), Table, Callout, Striketrough, YouTube, StaticTweet, Caption, anchor headings

### Theme System
- `next-themes` with `ThemeProvider` (class-based, system default)
- Custom `ThemeSwitch` toggle with manual localStorage + `prefers-color-scheme` media query listener
- Dark mode CSS in `global.css` with `.dark` class selector
- Syntax highlighting uses `--sh-*` CSS variables for light/dark themes

### Feed Generation
- Single route handler serves 3 formats: RSS 2.0, Atom 1.0, JSON Feed 1.0
- Uses `feed` npm package
- Content derived from blog posts (getBlogPosts)
- URL rewrites in next.config.js for clean URLs (/rss.xml, /atom.xml, /feed.json)

### OG Image Generation
- Dynamic endpoint: `/og?title=...`
- Uses `next/og` ImageResponse with JSX-based layout
- White background, title text, simple design

### Sitemap & Robots
- `sitemap.ts` generates dynamic sitemap.xml with all routes + blog posts
- `robots.ts` allows all user agents, points to sitemap

## Notable Design Decisions

- **No gray-matter:** Custom frontmatter parser to avoid extra dependencies
- **No database:** All content is file-based (MDX or hardcoded TypeScript)
- **Minimal dependencies:** No CMS, no ORM, no state management library
- **Photos page demo:** Not linked in nav, uses Unsplash placeholder images — likely a template leftover
- **`next-env.d.ts` in .gitignore:** This is auto-generated by Next.js, should NOT be in .gitignore (it's needed)
