# ByFabian — Path E Portfolio

**Type:** Next.js 15 App Router + React 19, TypeScript, Resend
**Status:** Initial implementation deployed to GitHub. Vercel import pending.
**Repo:** https://github.com/fabiancreation/byfabian (public)
**Output:** N/A — production builds via Vercel

## Design source

Implements **Path E** from the Claude Design handoff:

- A × C merged with **STUDIO ↔ DAYLIGHT** statement-style theme toggle
- **Three full-bleed hero variants** (a/b/c), live-switchable via `?hero=` query
- **B's image rhythm** for campaign detail pages (cinematic opener → 2-up
  portraits → italic pull-quote divider → 3-up triptych → 16:9 beat → closer)

Source bundle: `byfabian/project/unified.jsx` and the chat transcript that drove
the design decisions live in the Claude Design archive (not checked into the
repo — implementation only).

## Tech notes

- **Theme tokens** live in CSS variables (`src/app/globals.css`), keyed off
  `[data-theme="studio|daylight"]` on `<html>`. No-flash inline script applies
  the saved theme before paint.
- **Fonts:** system Helvetica/system-mono for sans/mono (matching design intent),
  `next/font` Fraunces for editorial italics.
- **Images:** copied from `Web/AI-Portfolio/public/images/` (responsive AVIF/WebP
  derivatives included). Campaign metadata from same source's `campaigns.generated.ts`.
- **Mobile:** Nav has slide-out menu; HeroMobile is image-below-heading (overlays
  get fussy at 390px); index grid stacks full-width.

## Hero variants

- `?hero=a` (default) — scrim + bottom-left anchor, most editorial
- `?hero=b` — corner type, no scrim, vertical mono meta, boldest
- `?hero=c` — knockout: title clips the hero image with `background-clip: text`

A floating dev switcher (bottom-left, desktop only) makes it easy to compare.
Remove the `<HeroVariantSwitcher />` from `src/app/page.tsx` once a variant is
chosen.

## Contact form

- Posts to `/api/contact` (Next.js route handler)
- Uses Resend if `RESEND_API_KEY` is set, otherwise dry-run (logs server-side)
- Set in Vercel project env: `RESEND_API_KEY`, optionally `CONTACT_FROM`, `CONTACT_TO`

## Campaign image system

Each campaign has **two active asset classes** with different rules:

| Field | Format | Purpose | Rendered with |
|---|---|---|---|
| `cover` (string) | Portrait (4:5) | Index/About tile, OpenGraph | `Frame mode="cover" aspect="4/5"` (cropped to fit) |
| `images[]` (CampaignImage[]) | Natural aspect | Editorial body — first frame is the campaign opener | `Frame` in default `mode="fit"` — natural aspect from `width × height`, never cropped |

**`heroImage` is currently unused** on the campaign detail page. The work speaks first via the body opener (the first frame from `planLayout`), not via a separate cover image. The field stays in the type for future use (e.g. dedicated OG/share images) but doesn't render anywhere right now.

### Layout planner

`src/lib/layout.ts` `planLayout(images, excludeIds)` walks `images[]` and emits a sequence of rows. The hero frame (if present in `images[]`) is excluded so it never appears twice.

Row types:
- **wide** — landscape/square frame, full-width inside the page padding
- **trio** — 3 portraits side by side
- **pair** — 2 portraits side by side
- **solo** — 1 portrait alone, max-width 720px, centered (avoided when possible — planner prefers pairs over orphan solos)

Portrait grouping prefers pairs:
- 4 portraits → `[2, 2]` not `[3, 1]`
- 5 → `[3, 2]`
- 6 → `[3, 3]`

A **pullquote divider** is inserted after the second body row. (Future: configurable position.)

### Cover

Always set `cover` per campaign — there's no fallback. It's used both for the index tile and as the OpenGraph image.

### Layout overrides (future)

If the auto-planner ever produces a layout you want to override (e.g., force a solo when planner emits a trio), add an optional field to the campaign data:

```ts
layoutHints?: ("hero" | "wide" | "pair" | "trio" | "solo" | "pullquote")[];
```

Then in `planLayout`, take that array as a manual sequence of row kinds and walk `images[]` filling in frames in order. Not implemented yet — wait until a campaign needs it.

## Local dev

```bash
npm install
npm run dev   # http://localhost:3000
npm run build # production build
```
