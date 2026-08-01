# Upgrade Plan — Dependency Updates

## Current State

All dependencies are from August 2024 (last meaningful commit). Many packages have had major version releases since then.

| Package | Current | Latest | Risk |
|---|---|---|---|
| `next` | 14.2.6 | 16.2.12 | **High** |
| `react` | 18.3.1 | 19.2.8 | **Medium** |
| `react-dom` | 18.3.1 | 19.2.8 | **Medium** |
| `typescript` | 5.5.4 | 7.0.2 | **Medium** |
| `@types/react` | 18.3.4 | 19.2.18 | **Medium** (coupled with React) |
| `@types/react-dom` | 18.3.0 | 19.2.4 | **Medium** (coupled with React) |
| `@types/node` | 22.5.0 | 26.1.2 | **Low** |
| `tailwindcss` | 3.4.10 | 3.4.17 (v3) / 4.3.3 (v4) | **Low** (staying v3) |
| `@tailwindcss/typography` | 0.5.14 | 0.5.20 | **Low** |
| `postcss` | 8.4.41 | 8.5.25 | **Low** |
| `autoprefixer` | 10.4.20 | 10.5.4 | **Low** |
| `geist` | 1.3.1 | 1.7.2 | **Low** |
| `next-mdx-remote` | 5.0.0 | 6.0.0 | **Medium** |
| `next-themes` | 0.3.0 | 0.4.6 | **Low** |
| `feed` | 4.2.2 | 6.0.0 | **Medium** (major bump) |
| `sugar-high` | 0.7.0 | 1.2.1 | **High** (major bump, API change) |
| `katex` | 0.16.11 | 0.18.1 | **Low** |
| `rehype-katex` | 7.0.1 | 7.0.1 | None (no update) |
| `remark-math` | 6.0.0 | 6.0.0 | None (no update) |
| `react-icons` | 5.3.0 | 5.7.0 | **Low** |
| `react-tweet` | 3.2.1 | 3.3.1 | **Low** |
| `react-wrap-balancer` | 1.1.1 | 1.1.1 | None (no update) |
| `react-youtube` | 10.1.0 | 10.1.0 | None (no update) |
| `@vercel/analytics` | 1.3.1 | 2.0.1 | **High** (major bump) |
| `@vercel/speed-insights` | 1.0.12 | 2.0.0 | **High** (major bump) |

## Decision: Keep Tailwind v3

Tailwind v4 is a complete rewrite with CSS-based configuration. Staying on v3 for now avoids the migration overhead.

## Breaking Changes Analysis

### 1. Next.js 14 → 16

#### Async params (HIGH IMPACT — will break)
Next.js 15 introduced async request APIs with sync deprecation warnings. **Next.js 16 removed sync access entirely.** This affects:

| File | What needs to change |
|---|---|
| `app/blog/[slug]/page.tsx:17` | `generateMetadata({ params })` → `const { slug } = await params` |
| `app/blog/[slug]/page.tsx:57` | `Blog({ params })` → make function `async`, use `await params` |
| `app/feed/[format]/route.ts:14-18` | `{ params }` in GET → use `await params` |

**Upstream `next-mdx-remote` concern:** `next-mdx-remote/rsc` internally uses `params` — verify v6 handles async params correctly. The codemod (`@next/codemod`) should handle these automatically, but the import alias `app/` might confuse it.

**Next.js codemod available:**
```bash
npx @next/codemod@canary next-async-request-api .
npx @next/codemod@canary upgrade latest
```

#### `swcMinify` config removal (LOW IMPACT)
`next.config.js:4` has `swcMinify: true` which is now the default and the config key is removed. Simply delete line 4.

#### Turbopack default (LOW IMPACT)
Next.js 16 uses Turbopack as the default bundler. No code changes needed — it's a drop-in replacement.

#### Node.js minimum version (NO IMPACT)
Next.js 16 requires Node.js 20.9+. Current environment has v22.12.0.

### 2. React 18 → 19

#### React.FC children type change (LOW IMPACT)
`@types/react` 19 removes implicit `children` from `React.FC`. In this codebase:

| Component | Status |
|---|---|
| `image-grid.tsx:13` — `React.FC<ImageGridProps>` | No children used — **no change needed** |
| `theme-switch.tsx:23` — `React.FC` | No children used — **no change needed** |
| `layout.tsx:50-54` — explicit `{ children }` typing | Already explicit — **no change needed** |
| `caption.tsx:4` — explicit `{ children }` typing | Already explicit — **no change needed** |
| `mdx.tsx` — implicit any props | Unaffected — **no change needed** |

#### Other React 19 changes
- `forwardRef` deprecated → Not used in this codebase
- Ref cleanup functions → Not used
- `useRef` now requires argument → Already provided everywhere

### 3. TypeScript 5.5 → 7.0

TypeScript major versions are backward-compatible. New strictness checks only apply if `strict: true`. Since this project uses `strict: false`, most new checks won't trigger. Potential new errors:

- **5.6 Nullish/Truthy checks**: May flag some patterns, but unlikely in this small codebase
- **5.7+** Various improvements, nothing breaking

### 4. Other Package Changes

#### `sugar-high` 0.7.0 → 1.2.1 (MEDIUM RISK)
Major version bump. Used in `app/components/mdx.tsx:5` and `app/components/mdx.tsx:34`.
- `highlight(code)` signature may have changed
- Verify the returned HTML structure and CSS class names are the same

#### `feed` 4.2.2 → 6.0.0 (MEDIUM RISK)
Two major versions. Used in `app/feed/[format]/route.ts`.
- Constructor signature may have changed
- Method names: `feed.rss2()`, `feed.atom1()`, `feed.json1()` — verify these still exist

#### `@vercel/analytics` 1.3.1 → 2.0.1 (LOW RISK)
v2 peer dependencies include `react: ^18 || ^19` and `next: >= 13` — compatible. Import path may have changed.
Used in `app/layout.tsx:6`: `import { Analytics } from "@vercel/analytics/react"`

#### `@vercel/speed-insights` 1.0.12 → 2.0.0 (LOW RISK)
v2 peer dependencies compatible. Import path may have changed.
Used in `app/layout.tsx:7`: `import { SpeedInsights } from "@vercel/speed-insights/next"`

#### `next-mdx-remote` 5.0.0 → 6.0.0 (MEDIUM RISK)
Peer dependency: `react: >=16`. Verify API compatibility and async params handling.

#### `next-themes` 0.3.0 → 0.4.6 (LOW RISK)
Minor version. Peer dependencies: `react: ^16.8 || ^17 || ^18 || ^19`. Should be safe.

## Proposed Upgrade Order

```
Step 1: Baseline
  ├── Run `pnpm build` to confirm current build works
  └── Fix any existing issues

Step 2: TypeScript & types first
  ├── typescript 5.5.4 → 5.7.x (safe intermediate, not 7.0 yet)
  ├── @types/node 22.5.0 → 22.x latest
  └── Verify type check passes

Step 3: Non-breaking package bumps
  ├── geist, next-themes, react-icons, react-tweet, katex
  ├── @tailwindcss/typography, autoprefixer, postcss
  └── Verify build passes after each group

Step 4: Core framework upgrade (Next.js + React)
  ├── Prepare: check Next.js 16 codemod compatibility
  ├── Run: `npx @next/codemod@canary upgrade latest`
  ├── Update next, react, react-dom, @types/react, @types/react-dom
  ├── Fix async params in blog/[slug]/page.tsx and feed/route.ts
  ├── Remove swcMinify from next.config.js
  └── Verify build passes

Step 5: Integration packages
  ├── next-mdx-remote 5.0.0 → 6.0.0
  ├── sugar-high 0.7.0 → 1.2.1 (check API, CSS class changes)
  ├── feed 4.2.2 → 6.0.0 (check API)
  ├── @vercel/analytics, @vercel/speed-insights → v2
  └── Verify build passes

Step 6: Finalize
  ├── TypeScript 5.7.x → 7.0.2
  ├── @types/node → 26.x latest
  └── Final build verification
```

## Known Small Issues to Fix

These are unrelated to dependency upgrades but worth addressing:

| Issue | File | Fix |
|---|---|---|
| `next-env.d.ts` in .gitignore | `.gitignore:37` | Remove — this file should be committed |
| Placeholder Twitter URL | `app/config.ts:11` | Set real X/Twitter URL or remove link |
| Footer links to placeholder Twitter | `app/components/footer.tsx:45` | Point to real URL or remove |
| Photos nav commented out | `app/components/nav.tsx:8` | Either implement photos page or remove dead code |
| `strict: false` in tsconfig | `tsconfig.json:7` | Consider enabling `strict: true` incrementally |
