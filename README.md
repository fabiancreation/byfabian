# ByFabian — Path E (Unified)

AI image-direction portfolio for Fabian Arndt. Implements the **Path E** design from
the Claude Design handoff: A × C merged with a STUDIO ↔ DAYLIGHT theme toggle, three
hero variants, and B's image rhythm in campaign pages.

## Stack

- Next.js 15 (App Router) + React 19
- TypeScript
- Sharp + `next/image` (AVIF/WebP, responsive)
- Resend for the contact form
- No CSS framework — theme via CSS variables in `src/app/globals.css`

## Local development

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

### Theme

Toggle STUDIO (dark, phos green) / DAYLIGHT (cerulean, coral) via the nav switch.
Choice persists in `localStorage` and is applied before paint via inline script.

### Hero variants

Three full-bleed hero treatments — switch with `?hero=a|b|c`:

- `a` — scrim + bottom-left anchor (default, most editorial)
- `b` — corner type, no scrim (boldest layout)
- `c` — knockout: title clips the hero image

A floating switcher in the bottom-left of the home page makes it easy to compare.

### Contact form

POSTs to `/api/contact`. To enable real sending, set in `.env.local`:

```
RESEND_API_KEY=...
CONTACT_FROM=ByFabian <hi@byfabian.com>
CONTACT_TO=fabian.arndt.info@gmail.com
```

Without the key, submissions are accepted silently (dry run, logged server-side).

## Deployment

Auto-deploys to Vercel on push to `main`. Add `RESEND_API_KEY` in Vercel project
settings before the first real submission.

## Where the design came from

Claude Design transcript in `byfabian/chats/chat1.md` of the original handoff
bundle. Components implement `unified.jsx` (Path E) from that bundle, reworked
for the Next.js stack used here.
