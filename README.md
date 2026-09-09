# codebyaadi.com

[![Live on Netlify](https://img.shields.io/badge/Live%20on-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://codebyaadi.com)

My personal portfolio — a dark-first, single-page site with an interactive
hero, scroll-driven motion, a custom pointer, and a projects section built
from real work.

🌐 **[codebyaadi.com](https://codebyaadi.com)**

## Stack

- **Framework** — [Next.js 16](https://nextjs.org/) (App Router, Turbopack), React 19.2
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com/), OKLCH design tokens
- **Type** — Geist + Geist Mono, Space Grotesk (display), Instrument Serif (accent)
- **Motion** — [`motion`](https://motion.dev/) for the cursor and magnetic buttons; everything
  else is CSS (scroll-reveal via `IntersectionObserver`, parallax via `animation-timeline: view()`)
- **Icons** — [Simple Icons](https://simpleicons.org/) for tech marks, Lucide for UI
- **Analytics** — Umami (loaded only when `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set)
- **Hosting** — Netlify, continuous deploy from `main`

## Develop

```bash
bun install
bun run dev        # http://localhost:3000
bun run build      # production build (tsc + next build)
bun run lint
bun run format
```

## Structure

- `src/app` — routes, metadata, generated OG image, blog
- `src/components/site` — page sections (hero, projects, experience, contact …)
- `src/components` — cross-cutting UI (cursor, theme toggle, reveal observer)
- `src/constants` — all site content as plain data modules

## Accessibility & motion

Semantic landmarks, one `<h1>`, visible focus rings, a skip link, and full
keyboard support. Every animation is gated behind `prefers-reduced-motion` —
the hero grid freezes, reveals resolve instantly, and the custom cursor does
not mount.
