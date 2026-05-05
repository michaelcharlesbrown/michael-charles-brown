# michaelcharlesbrown.com — Claude Code Project Brief

**Site:** michaelcharlesbrown.com
**Owner:** Michael Charles Brown, Composer / Recording Artist
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

Three page types. That is all.

1. **Home** (`/`) — 3-column card grid, desktop. 1-column card grid, mobile.
2. **About** (`/about`) — Text-only page. No images.
3. **Project** (`/projects/[slug]`) — Single dynamic template. Six projects, one template.

Every page shares the same Header and Footer. These are rendered once in `app/layout.tsx`. They are never manually dropped into individual pages.

---

## File Structure

```
app/
  layout.tsx              ← Root layout. Renders Header + Footer around all pages.
  globals.css             ← All styles. Single source of truth.
  page.tsx                ← Homepage
  about/
    page.tsx              ← About page
  projects/
    [slug]/
      page.tsx            ← Single project template (no per-project if-blocks)
components/
  Header.tsx              ← Site header: name (left), tagline (right), triangle (center)
  Footer.tsx              ← Site footer: social links (left), CONTACT (right)
  NavIcon.tsx             ← Triangle only. Used inside Header exclusively.
  audio/
    AudioPlayer.tsx       ← Custom audio player. Do not modify.
data/
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
- Desktop: Name flush left, tagline flush right, both on the same line. Triangle centered below.
- Mobile: Name full viewport width (useFitText), tagline full viewport width (useFitText) on the line below. Triangle centered below that.
- Name uses Geist Sans, bold, uppercase
- Tagline uses Geist Mono, uppercase
- Triangle uses NavIcon component

---

## Footer Component

File: `components/Footer.tsx`

Structure:
- Full width
- Desktop: Social links flush left separated by ` | `, CONTACT flush right. Same line.
- Mobile: "CONTACT" + "GET IN TOUCH" on one line (left and right). Social links on the line below, full viewport width (useFitText), separated by `///`.
- All text Geist Mono, uppercase
- All links plain text, no underline by default, underline on hover

---

## Project Data (`data/projects.ts`)

The Project interface must include all content needed to render a project page without any per-project if-blocks in the template. Fields:

```typescript
interface Project {
  slug: string
  title: string
  subtitle: string           // e.g. "ORIGINAL SCORE", "APOCALYPTIC AMERICANA"
  type: 'film' | 'music'    // determines hero variant
  heroImage: string          // path to hero image (film: poster, music: decorative)
  credits: string            // e.g. "Written and directed by Carlos Marulanda"
  description: string        // main body paragraph(s)
  video?: string             // self-hosted video path (film projects)
  videoEmbed?: {             // external embed (music projects: YouTube/Vimeo)
    type: 'youtube' | 'vimeo'
    src: string
  }
  spotifyId?: string         // Spotify artist ID if applicable
  links?: {                  // external links (Bandcamp, Instagram, etc.)
    label: string
    href: string
  }[]
  // Homepage card
  cardVideo: string          // video path for homepage card hover
  cardPoster: string         // poster image for homepage card
  cardDescriptor: string     // right-aligned caption e.g. "ORIGINAL SCORE"
}
```

---

## Project Page Template (`app/projects/[slug]/page.tsx`)

- One template. No per-project if-blocks.
- Reads all content from `projects.ts`.
- Hero variant determined by `project.type`:
  - `film`: full-width hero image with video ready to play on click (poster shown by default)
  - `music`: full-width static hero image, no video
- Below hero: two columns on desktop, stacked on mobile.
  - Left: title, subtitle, credits
  - Right: description paragraph(s)
- AudioPlayer rendered if project has audio
- Spotify embed rendered if project has `spotifyId`
- External links rendered if project has `links`

---

## Homepage (`app/page.tsx`)

- 3-column grid desktop, 1-column mobile
- Each card: `aspect-[5/7]`, full width, video with poster, hover to play (desktop), IntersectionObserver auto-play (mobile)
- Caption below each card: project title bold flush left, descriptor flush right. Geist Mono, uppercase, small.
- Cards link to `/projects/[slug]`
- No per-card if-blocks. Renders from `projects` array.

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
- Do not drop Header, Footer, or NavIcon manually into page files — they render from layout.tsx.

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
- `LenisProvider.tsx` — smooth scroll, complete, do not touch
- The VideoCard IntersectionObserver logic in `app/page.tsx` — working correctly, do not touch
