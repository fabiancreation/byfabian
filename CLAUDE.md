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

## Local dev

```bash
npm install
npm run dev   # http://localhost:3000
npm run build # production build
```
