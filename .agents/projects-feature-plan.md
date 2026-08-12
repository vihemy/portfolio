# Projects Feature Plan

## Goal

Replace the flat external-link `/projects` page with a case-study index → detail-page pattern. Each case study is an *evidence package*: a privacy-respecting narrative that proves technical adeptness, a product/user-value orientation, and a problem-solving mindset (decisions and rationale over stack name-drops).

Messaging axes (per the site's existing positioning in `app/config.ts`):
- I'm technically adept — multi-device systems, AI pipelines, operability engineering.
- I focus on product and user value — visitor experience, privacy, multi-language UX.
- I solve problems, not only implement others' solutions — Challenge → Approach → Outcomes arc.

Three v1 case studies sourced from `project_documentation/`:

1. **Nordiska Museet — Diffusion Model Powered Portrait Pipeline** — *Upgrading an existing AI photobooth installation.* Lead Programmer. Story: Windows/SMB/NDI/SD1.5 ad-hoc rig → Linux/systemd/SFTP service-oriented rig with an SDXL + InstantID + IPAdapter identity-preserving pipeline.
2. **Trapholt — Physical-Digital Art Exploration Tool** — *Building a multi-device museum platform from scratch.* Full-stack engineer (SvelteKit 2 + Sanity + MQTT ingestion + SSE multi-surface sync + privacy-engineered research-data exports).
3. **Kattegatcentret — GenAI Idea Visualizer** — *Standalone AI installation app.* Lead Developer (Unity/C# FSM → profanity+relevance moderation → OpenAI DALL·E + completion model → 4-screen + DMX synchronized show).

## Naming policy

- Name all three museums publicly (Nordiska Museet, Trapholt, Kattegatcentret).
- Name the installation studio **noparking.dk** publicly.
- Reference Trapholt's collection API generically as "the museum's collection-management API" (the doc calls it "SARA"; not yet confirmed OK to name).
- Publish-under-existing-agreement assumption; revisit per case if asked to take something down.

## Privacy & sanitization policy (always applied, no per-case gate)

Before any visual/copy is committed:
- Strip internal IP addresses, Windows hostnames, AnyDesk/credential placeholders, private GitLab repo URLs.
- Strip live API keys (e.g., the `config.txt` `API_KEY` in Kattegatcentret docs).
- Inspect each candidate diagram/screenshot for internal names before drop-in — particularly `data-flow.png` (Trapholt) and `new_inputs.png`/`old_inputts.png` (Nordiska).
- Strip EXIF/metadata from images at import time (`mogrify -strip` or equivalent).
- Any code samples shown on case-study pages must be **standalone synthetic reconstructions** — they must compile independently of proprietary client modules. Use a small `Callout` above such snippets noting them as illustrative reconstructions (reuses existing MDX Callout component, no new component needed).
- No real visitor PII (ideas, selfies, survey responses, emails, postal codes).

## Content model

One MDX file per project under `content/projects/{slug}.mdx`. Reuses the existing frontmatter parser + `CustomMDX` machinery from the blog (sugar-high code highlighting, katex, callouts, image-grid). No new dependencies. No new frontmatter library.

### Frontmatter fields

Scalars parsed by the existing line-split parser in `app/lib/posts.ts`. Array fields encoded as bracketed inline lists (`tags: [SvelteKit, Sanity, MQTT]`) and split on comma during parse.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Public title (exhibition name, not codename) |
| `year` | number | yes | Year of delivery |
| `client` | string | yes when permitted | Museum name |
| `clientType` | string | yes | e.g. "Nordic cultural-history museum" |
| `role` | string | yes | "Lead Developer" / "Lead Programmer" / "Full-stack engineer" |
| `engagementType` | string | yes | "Standalone app" / "Upgrade of existing system" / "Greenfield build" |
| `summary` | string | yes | 1–2 sentence strapline for the card |
| `tags` | string[] | yes | Up to ~4 stack/skill chips |
| `stack` | string[] | yes | Full structured stack list (rendered on detail page) |
| `hardware` | string | optional | Devices/surfaces, or omitted for non-hardware projects (e.g., MCP server) |
| `integrations` | string[] | optional | External systems (Pixilab Blocks, SARA, Mailchimp, OpenAI, etc.) |
| `privacyApproach` | string | optional | Short prose on what was done to protect visitor data |
| `outcomes` | string[] | yes | Descriptive impact bullets (*not* quantitative). Top item surfaces on the card; full list renders on detail page. |
| `heroImage` | string | yes | Path under `public/`, e.g. `/projects/nordiska/before-after.png` |
| `featured` | boolean | optional | Pin to top of index (default false) |

### MDX body (freeform, server-rendered via CustomMDX)

Images are placed inline in the MDX body where they support the description, rendered at their **natural aspect ratio** via the `Image` component (pass `width`/`height` matching the source pixels plus `className="w-full h-auto rounded-lg"`). No bottom gallery section.

Recommended section headings (shape may flex per project):
- `## Challenge`
- `## Approach`
- `## Operability & privacy`
- `## Outcomes` (expand on the frontmatter outcomes array)

## Routes & code

```
content/projects/
  diffusion-portrait-pipeline.mdx
  physical-digital-art-tool.mdx
  genai-idea-visualizer.mdx

app/projects/
  page.tsx              # becomes the index — short prose intro + card grid
  [slug]/page.tsx       # case-study detail page (mirrors app/blog/[slug]/page.tsx)
  project-data.ts       # expanded Project type + getProjectPosts()

app/lib/
  posts.ts              # add getProjectPosts(dir) reusing parseFrontmatter/getMDXData,
                        # with comma-split parsing for fields declared as string[]

public/projects/{slug}/  # curated visuals only (scrubbed PNGs/JPEGs/WebP; no raw PDFs/runbooks)

app/sitemap.ts          # append getProjectPosts() paths alongside blog paths
```

Files to delete / supersede:
- `app/projects/project-data.tsx` (old `Project` interface + 3 entries); replaced by `app/projects/project-data.ts`.
- The `Idea Machine`, `BrightSign Log Tools`, and `Mød Mig I Mørket` entries are removed entirely (per "delete all three" decision).
### Index page (`app/projects/page.tsx`)

- Short prose intro paragraph articulating the recurring pattern across the work (interactive installations + AI pipelines + operability + multilingual UX) and the role axis. Reinforces problem-solver messaging.
- Responsive card grid. Each card shows: hero image, title, year corner marker, summary line, and chips for role · engagement type · client (when public) · stack tags. Top `outcomes` bullet surfaced as muted text under summary on hover/secondary line.

### Detail page (`app/projects/[slug]/page.tsx`)

Mirrors `app/blog/[slug]/page.tsx`:
- `generateStaticParams()` from `getProjectPosts()`
- `generateMetadata()` with case-study title/summary/heroImage
- `CustomMDX` for the body
- JSON-LD `Article` structured data
- OG image reuses existing `/og?title=…` endpoint (no new OG plumbing)
- Renders the structured frontmatter as a metadata sidebar/header (role, year, client, engagementType, stack list, integrations, privacyApproach) and the `outcomes` array as a bullet list, then the MDX body (which contains the inline images at natural aspect ratio).

### Sitemap & SEO

`app/sitemap.ts` extended to include `getProjectPosts()` paths parallel to blog paths. `app/robots.ts` unchanged (already generic). OG image generation already generic.

## Per-project source→case-study mapping

### 1. Nordiska — `diffusion-portrait-pipeline.mdx`

- **Hero:** `new docs/new_result.png`. Inline body images: `old docs/old_inputts.png` + `old docs/old_result.png` in the Challenge section (the fragile original rig), `new docs/new_inputs.png` in the Approach section (the redesigned wizard) — the strongest before/after delta story of the three.
- **Frontmatter:** year flagged as 2024 (paths use `240206`); client "Nordiska Museet"; clientType "Nordic cultural-history museum"; role "Lead Programmer"; engagementType "Upgrade of existing system"; tags `[Unity, ComfyUI, Stable Diffusion, systemd]`; stack adds `Pixilab Blocks, Tornado, Paramiko, Millumin, OSC, SFTP, InstantID, IPAdapter, SDXL`; integrations `[ComfyUI, Pixilab Blocks, Millumin, SFTP]`; outcomes (descriptive, not quantitative):
  - "Replaced a fragile Windows batch-script rig with a Linux/systemd service stack that auto-restarts on failure and is operable by non-specialist gallery staff."
  - "Upgraded the diffusion pipeline from SD1.5 + rembg/masking to SDXL + InstantID + IPAdapter, producing identity-preserving stylized portraits without the visible cut-paste seams of the previous workflow."
  - "Removed the bespoke NDI streaming app by having the AI PC upload directly to the projection server over SFTP — fewer moving parts, fewer failure modes."
- **Body MDX** walks the old→new diff: file transfer (SMB→HTTP/SFTP), process supervision (shell:startup bat→systemd), image delivery (NDI→SFTP), model (Realistic_Vision_V5.1→JuggernautXL Ragnarok v9), identity approach (mask-paste→InstantID+IPAdapter), and the offline-mode config hardening.
- **Privacy strip:** remove `172.25.77.*` internal IPs, `DESKTOP-4PNVUVQ`/`DESKTOP-9TOK506` hostnames, AnyDesk `changethis` placeholder, `gitlab.com/noparking.dk/...` repo URLs, pCloud links.

### 2. Trapholt — `physical-digital-art-tool.mdx`

- **Hero:** `data-flow.png` (system architecture). Inline body images: `data_handling.png` in the Approach section (data pipeline), `12213-Trapholt-Til-Vaegs-010-1366x911.jpg` in the Approach section (wall display).
- **Frontmatter:** year marked 2024; client "Trapholt"; clientType "Danish art & design museum"; role "Full-stack engineer"; engagementType "Greenfield build"; tags `[SvelteKit, Sanity, MQTT, SQLite]`; stack adds `Svelte 5, Vite, better-sqlite3, Pixilab Blocks (via @nopa/svelte-plus-blocks), Chart.js, simple-keyboard, PM2, node-cron, OpenAI, Mailchimp/Mandrill, Google Sheets API`; integrations `[Sanity, museum collection API, Mailchimp, OpenAI, Google Sheets]`; outcomes (descriptive):
  - "Owned end-to-end delivery — schema design, background workers, Svelte UI, deployment and ops — as the sole full-stack engineer."
  - "Built fault-tolerant MQTT ingestion that survives sloppy embedded payloads via multi-pass JSON parsing with per-interaction error isolation and a raw-dump audit trail."
  - "Designed survey data with DB-level CHECK constraints validating JSON structure *and* physical units (mV/V, °C/F/K/R, %/RH, hPa/mb) so bad telemetry is rejected at the storage layer."
  - "Engineered visitor-data privacy by default: emails hashed before export, postal codes mapped to Danish regions, log-obscuring script for historical emails — so research exports never leak PII."
  - "Real-time SSE broadcast hub lets any kiosk POST an entry and every open stream on a synchronized multi-surface experience receive it."
- **Body MDX** draws on the portfolio-edition `project_description.md`. Optional internal codename "The Intrinsic Node" appears as a subtitle inside the case; the public-facing title uses the exhibition's framing.
- **Privacy strip:** rename internal asset code `12213-Trapholt-Til-Vaegs-010` when copying the WebP into `public/`; reference SARA as "the museum's collection-management API" until explicitly confirmed otherwise.

### 3. Kattegatcentret — `genai-idea-visualizer.mdx`

- **Hero:** `installation.jpg` (the physical rig). Inline body image: `sequence_diagram_uml.png` in the Approach section (runtime flow, right after the FSM callout).
- **Frontmatter:** year 2024; client "Kattegatcentret"; clientType "Danish aquarium"; role "Lead Developer"; engagementType "Standalone app"; tags `[Unity, C#, OpenAI, DALL·E]`; stack adds `URP, FSM, UnityWebRequest, Unity JsonUtility, DMX integration`; integrations `[OpenAI DALL·E, OpenAI Completion, DMX fixture]`; outcomes (descriptive):
  - "Designed a finite state machine that takes a visitor idea → moderates for profanity in three languages → classifies for topical relevance via a second model call → routes the result into a synchronized 4-screen + DMX light show."
  - "Made the installation operable by gallery staff without a rebuild: API keys, model selection, image size, system context, and the profanity word lists all live as plain-text files in StreamingAssets."
  - "Built a 15-entry rolling slideshow of 'relevant' AI-generated images with fallback entries from StreamingAssets, so the exhibit is never blank on a cold start or during an OpenAI outage."
  - "Single-engineer delivery: shipped the full FSM, profanity filter, OpenAI integration, image downloader, dashboard, audio, and light controller."
- **Body MDX** walks the runtime flow keyed to the UML diagram.
- **Privacy strip:** remove the live `API_KEY` value from `config.txt` — never reproduce it; the public GitHub repo at `github.com/vihemy/dinide` is already publication-clean, so linking it from the case study is fine (the lone public-link case among the three).

## Future-proofing

- Adding a new case study = drop one `.mdx` in `content/projects/` filling the shared `Project` schema. Optional fields are genuinely optional (the upcoming **MCP server** project simply omits `hardware`, `client`, `clientType`; sets `engagementType: "Tooling / Open-source"`). Schema is a superset by design, so adding fields later propagates from a single type definition in `project-data.ts`.
- The card and detail page both read the same shared `Project` type, so card-up addition runs zero bespoke wiring.

## Out of scope for v1

- Filtering/tag index routes (`/projects/tags/[tag]`)
- Search
- Tests (matches the repo's no-tests stance)
- Conversion of any other legacy projects beyond the three documented ones
- Annotated video walkthroughs — flagged as a possible v1.5 enhancement; the schema leaves room via an optional `video` field we can add later without migrating content

## Verification

- `pnpm build` (per AGENTS.md) — static export must succeed with three new case-study routes generated
- Visit `/projects` and each `/projects/{slug}` locally via `pnpm dev`
- Confirm `sitemap.xml` includes the three case-study URLs
- No lint/typecheck configured (per AGENTS.md); TypeScript `strict: false`