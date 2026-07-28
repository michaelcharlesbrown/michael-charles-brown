# michaelcharlesbrown.com — Claude Code Project Brief

**Site:** michaelcharlesbrown.com
**Owner:** Michael Charles Brown, Musician / Producer / Film Composer (see `data/site.ts`)
**Stack:** Next.js App Router, TypeScript, Tailwind CSS v4

---

## Dev Server

This project always runs on port 3000. This is hardcoded in package.json.
Start the server with: npm run dev
The dev script automatically kills port 3000 before starting. Do not manually kill the port. Do not run npm run dev more than once per session. Do not suggest running on any other port.

---

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Lenis (smooth scroll)
- No CMS — content is hardcoded or file-based in /data/projects.ts
- Images and video self-hosted in /public
- No database, no auth, no e-commerce

---

## Site Structure

Routes live in two route groups. The `(site)` group is the public site and is
the only part that shares the Header and the global chrome.

**Indexed — inside `(site)`:**

1. **Home** (`/`) — 3-column card grid, desktop. 1-column card grid, mobile.
2. **About** (`/about`) — Text-only page. No images.
3. **Project** (`/projects/[slug]`) — Single dynamic template. Six projects, one template.

**Not indexed — standalone, outside `(site)`:**

4. **Links** (`/links`) — link-in-bio page. `noindex`, absent from the sitemap.
5. **Studio Manual** (`/studio-manual`) — private reference doc, own layout and
   CSS module. `noindex`. The only page allowed to deviate from the design system.
6. **404** — `app/(site)/not-found.tsx` catches `notFound()` inside the site group
   (so it keeps the Header); `app/not-found.tsx` catches unmatched top-level URLs.
   Both render the shared `components/NotFoundContent.tsx`.

There is no Footer component. The Header renders once in `app/(site)/layout.tsx`,
never manually in a page file.

---

## File Structure

```
app/
  layout.tsx              ← Root layout. <html>/<body>, fonts, site-wide metadata.
  globals.css             ← All styles. Single source of truth.
  not-found.tsx           ← 404 for unmatched top-level URLs.
  robots.ts               ← Generates /robots.txt
  sitemap.ts              ← Generates /sitemap.xml (indexed routes only)
  (site)/                 ← Public site. Header + Lenis + JSON-LD graph.
    layout.tsx            ← Renders Header. Emits Person/Organization/WebSite schema.
    page.tsx              ← Homepage
    not-found.tsx         ← 404 inside the site group (keeps Header)
    about/page.tsx        ← About page
    projects/[slug]/      ← Single project template (no per-project if-blocks)
      page.tsx            ← Also builds Movie/MusicGroup + BreadcrumbList schema
  (studio-manual)/        ← Private doc. Own layout + CSS module. noindex.
  links/                  ← Link-in-bio page. noindex.
  components/LenisProvider.tsx  ← Smooth scroll. Do not modify.
  hooks/useParallax.ts    ← Parallax hook for project hero.
components/
  Header.tsx              ← M/C/B (left), NavIcon triangle (center), CONTACT (right)
  NavIcon.tsx             ← Triangle only. Used inside Header exclusively.
  JsonLd.tsx              ← Renders a schema object into a ld+json script tag.
  ProjectCard.tsx         ← Homepage card. IntersectionObserver logic — do not modify.
  ProjectPageClient.tsx   ← Project page body, hero, modal, gallery.
  NotFoundContent.tsx     ← Shared 404 markup for both not-found boundaries.
  FitText.tsx             ← Wraps useFitText; mobile-only fluid sizing.
  SocialLinks.tsx         ← Renders a ProjectLink[] as a separated row.
  HomeLenis.tsx           ← Homepage-only Lenis instance.
  audio/AudioPlayer.tsx   ← Custom audio player. Do not modify.
src/components/ui/
  RollLink.tsx            ← Split-text roll hover link. Used site-wide.
data/
  site.ts                 ← SINGLE SOURCE OF TRUTH for name, roles, tagline, titles.
  projects.ts             ← All project content. Single source of truth for project data.
hooks/
  useFitText.ts           ← ResizeObserver hook for fluid viewport-width typography.
```

---

## Design System

### Typography

The entire site uses one font, one size, period:

- **Geist Mono, 12px** — everywhere. Header, captions, body copy, labels, buttons, all of it.
- No other fonts. No Geist Sans. No IBM Plex Mono. No other size variants.
- Defined once: `--text: 0.75rem` on `:root`, applied on `body` via `font-size: var(--text)`. Every element inherits.
- The only typographic deviations allowed:
  - `font-weight: 700` on items that are bold (site title, card titles, project titles, CTA buttons, social rows, audio player label).
  - `text-transform: uppercase` on items that are uppercase.
  - That is the full extent. No `letter-spacing`, no per-class `font-size`, no per-class `font-family` declarations.
- Non-typography elements may have larger sizes when they are icons or glyph buttons (e.g. the `×` close button on the project video modal). These are UI elements, not text.

### Color

- Black and white only. `#000000` and `#ffffff`.
- No dark mode. The `@media (prefers-color-scheme: dark)` block does not exist in this project.
- No grays, no off-whites, no rgba tints except inside specific component internals (AudioPlayer progress bar, etc.).

### Layout & Spacing

- One CSS custom property controls horizontal edge padding: `--page-x`. Applied via the `.page-wrap` class.
- Every page uses `.page-wrap` for horizontal padding. No component defines its own horizontal padding.
- No component-level margin or padding overrides unless explicitly required by that component's internal layout.
- Spacing is minimal and consistent. This is a brutalist site.

### Images

- No border-radius on images. `img { border-radius: 0 }` globally.
- Images are content. They fill their containers completely using `object-fit: cover`.
- All images are self-hosted in `/public/images/`.

### Navigation

- The triangle is the only navigation element on the entire site.
- Navigation is contextual:
  - Homepage (`/`) → links to `/about`
  - About (`/about`) → links to `/`
  - Project pages (`/projects/[slug]`) → links to `/`
- It is centered horizontally, positioned near the top of every page.
- It lives inside the `Header` component. It is never manually placed in a page file.

---

## Header Component

File: `components/Header.tsx`

Structure:
- Fixed position, full width, z-index 50
- One line: `M/C/B` flush left (links to `/about`), NavIcon triangle centered,
  `CONTACT` flush right (mailto link). Same on desktop and mobile.
- Both text links use RollLink for the split-text roll hover.
- The site title is deliberately cryptic. Do not replace `M/C/B` with the full
  name — the crawlable full name lives in the visually-hidden `h1` on the homepage.

There is no Footer component. Do not create one.

---

## Project Data (`data/projects.ts`)

The Project interface must include all content needed to render a project page without any per-project if-blocks in the template. Fields:

See `data/projects.ts` for the authoritative interface. Fields that are easy to
get wrong:

- `description` is `string[]` — one entry per paragraph, not a single string.
- `heroVideo` / `heroPoster` drive the hero; there is no `heroImage`.
- `directorCredit` (`{ prefix, name, href }`) replaces the old flat `credits`
  string. `creditInRightColumn` moves that line to the right column.
- `ogDescription` is the meta/OG/schema description. It is the only SEO copy
  stored per project — keep it factual, it feeds `Movie`/`MusicGroup` schema.
- `ogImage` is optional; it defaults to `/projects/<slug>/images/og-<slug>.jpg`.
- `genre` is schema-only, and holds *recognized* genres ("Americana", "Ambient").
  Do not feed `subtitle` / `cardDescriptor` marketing copy into it.
- `datePublished` is films only and is currently **unset on every project, on
  purpose**. Cancuncito is unreleased, Snow King's year is unknown, and dating
  only Breathing Chamber (2007) would make the film work look nineteen years
  stale. Never guess a year — it is a public claim about someone else's film.
  Add them back only as a complete, honest set.
- `links[].schemaOnly` includes a link in JSON-LD `sameAs` without rendering it.
- `streamUrl` / `buyUrl` / `albumTitle` drive the music CTA row; there is no
  `spotifyId` field.

---

## Project Page Template (`app/(site)/projects/[slug]/page.tsx`)

- One template. No per-project if-blocks.
- Reads all content from `projects.ts`.
- The server component handles metadata + JSON-LD only; all rendering lives in
  `components/ProjectPageClient.tsx`.
- Hero is an autoplaying muted video with poster, swapped by viewport:
  desktop uses `heroVideo`/`heroPoster`, mobile uses `cardVideo`/`cardPoster`.
- Below hero: two columns on desktop, stacked on mobile.
  - Left: title (`h1`), subtitle, AudioPlayer, CTA row
  - Right: director credit (when `creditInRightColumn`), quote, description, links
- `film` + `videoEmbed` renders a WATCH button opening a modal iframe.
- `music` renders STREAM / BUY from `streamUrl` / `buyUrl`.
- AudioPlayer renders when the slug has an entry in `PROJECT_AUDIO`.

---

## Homepage (`app/(site)/page.tsx`)

- 3-column grid desktop, 1-column mobile, scroll-snap sections.
- **Every project renders twice** — once in the desktop row grid, once as a
  mobile snap section. CSS hides one set. Expect duplicate DOM nodes; this is
  intentional, not a bug.
- Each card: `aspect-ratio: 5/7`, video with poster, hover to play (desktop),
  IntersectionObserver auto-play (mobile).
- Caption below each card: project title as `h2.card-caption-title` flush left,
  descriptor flush right.
- Cards link to `/projects/[slug]`.
- No per-card if-blocks. Renders from `projects` array.

---

## SEO Conventions

These are load-bearing. Do not undo them.

- **`data/site.ts` is the single source of truth for site identity.** The name,
  roles, tagline, title, and positioning descriptions all live there and are
  imported everywhere else. Never hardcode the name, the role list, or the
  positioning phrasing in a component, layout, or metadata block — that is
  exactly how the site ended up describing Michael three different ways on the
  same page (title said one thing, meta another, h1 a third). To reposition,
  edit `data/site.ts` once.
- **Identity has three tiers, by design.** They are an expansion, never a
  contradiction — each tier is a superset of the one above it:
  1. `ROLES` — what the page *shows*
     (`MUSICIAN /// PRODUCER /// FILM COMPOSER`), on /about and /links.
  2. `TAGLINE` / `SITE_TITLE` — the `<title>`, og/twitter title, and hidden
     homepage h1 ("Musician, Producer & Film Composer"). Same three roles as
     tier 1, in prose. Keep near 60 chars or Google truncates it.
  3. `JOB_TITLES` / `KNOWS_ABOUT` / `PERSON_DESCRIPTION` — structured data.
     The fullest, most searchable form (record producer, songwriter, visual
     artist, film composer). Breadth here is the whole point.
- **Identity is unified; descriptions are not.** Every page frames Michael the
  same way, but each page still needs its *own* meta description sentence —
  Google treats identical descriptions across pages as a negative signal.
- **Every indexed page declares its own canonical** via
  `alternates: { canonical: "/path" }`. Never put `canonical` in a parent layout
  — Next inherits it into children, which would canonicalize the whole site to
  one URL.
- **Exactly one `h1` per page.** The homepage's is
  `h1.visually-hidden` (see `.visually-hidden` in globals.css) so the design
  stays cryptic while crawlers get the real name. Project pages use `.proj-title`.
- Tag choice is separate from styling. `.proj-title`, `.card-caption-title` etc.
  carry all the type styling, and Tailwind preflight resets heading size/weight,
  so swapping a `div` for an `h1`/`h2` is a visual no-op. Prefer the semantic tag.
- `noindex` pages (`/links`, `/studio-manual`) must stay out of `sitemap.ts`.
  Listing a noindexed URL sends Google contradictory signals.
- `sitemap.ts` deliberately omits `lastModified`. It would be the build
  timestamp, which claims every page changed on every deploy.
- JSON-LD is one linked graph. Entities are referenced by stable `@id`
  (`/#person`, `/#website`, `/projects/<slug>#movie`) rather than repeated
  inline. When adding an entity, give it an `@id` and an `image`.

---

## Core Rules

- No inline styles. Ever. Typography, spacing, and color live in globals.css only.
- No `!important`. Ever.
- No hardcoded colors, font sizes, or spacing values in component files.
- No new dependencies without explicit approval.
- No restructuring working code unless explicitly asked.
- No quick fixes that create technical debt.
- Do not add a CMS, database, or any external data layer.
- Do not run `npm run build` unless explicitly asked.
- Do not start the dev server more than once per session.
- The dev server is already running on port 3000 when you receive this. That is the site we are working on. Do not attempt to start it, restart it, kill it, or suggest running on any other port. If you see port 3000 is occupied, that is correct and expected. Leave it alone.
- Do not introduce additional fonts, font sizes, or `letter-spacing`. The site is one font (Geist Mono) at one size (12px). See the Typography section.
- Do not add dark mode styles.
- Do not add border-radius to images.
- Do not drop Header or NavIcon manually into page files — they render from
  `app/(site)/layout.tsx`. (`app/not-found.tsx` is the one exception: it sits
  outside the `(site)` group and so renders Header itself.)
- Do not add a Footer. There isn't one.

---

## Debugging Protocol

1. State what is actually happening vs. what should be happening. Be specific.
2. Form one hypothesis. State it clearly.
3. Make the smallest possible change to test it.
4. Report the result.

If two consecutive hypotheses are wrong, stop and ask for direction. Do not keep guessing.

---

## Components That Must Not Be Modified

- `components/audio/AudioPlayer.tsx` — custom audio player, complete, do not touch
- `app/components/LenisProvider.tsx` — smooth scroll, complete, do not touch
- The IntersectionObserver logic in `components/ProjectCard.tsx` — working correctly, do not touch
