# michaelcharlesbrown.com — Claude Code Project Brief

**Site:** michaelcharlesbrown.com
**Owner:** Michael Charles Brown, Composer / Recording Artist
**Stack:** Next.js App Router

---

## Dev Server

This project always runs on port 3000. This is hardcoded in package.json.
Start the server with: npm run dev
The dev script automatically kills port 3000 before starting. Do not manually kill the port. Do not run npm run dev more than once per session. Do not suggest running on any other port.

---

## Stack

- Next.js App Router
- No CMS — content is hardcoded or file-based
- Images and video self-hosted in /public
- No database, no auth, no e-commerce

---

## Core Rules

- No inline styles. Typography, spacing, and color live in globals.css only.
- No new dependencies without asking first.
- No restructuring working code unless explicitly asked.
- No quick fixes that create technical debt.
- Do not add a CMS, database, or any external data layer.

---

## Debugging Protocol

1. State what is actually happening vs. what should be happening. Be specific.
2. Form one hypothesis. State it clearly.
3. Make the smallest possible change to test it.
4. Report the result.

If two consecutive hypotheses are wrong, stop and ask for direction. Do not keep guessing.

---

## What Not To Do

- Do not use !important
- Do not hardcode colors, font sizes, or spacing in components
- Do not refactor working code without being asked
- Do not run npm run build unless explicitly asked
- Do not start the dev server more than once
