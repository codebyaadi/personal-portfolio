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
- **Motion** — [`motion`](https://motion.dev/) for the magnetic buttons; everything else
  is CSS (scroll-reveal via `IntersectionObserver`, parallax via `animation-timeline`,
  cursor + nav indicator via CSS transitions)
- **Icons** — [Simple Icons](https://simpleicons.org/) for tech marks, Lucide for UI
- **Analytics** — Umami (loaded only when `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set)
- **Hosting** — Netlify, continuous deploy from `main`

## SEO & GEO

- Per-page metadata, canonicals, `profile` Open Graph, generated OG/Twitter
  images (`next/og`), a web manifest, and generated favicons.
- **JSON-LD** — `Person` + `WebSite` + `ProfilePage` + project `ItemList` +
  `FAQPage` on the home page; `Blog` + `BreadcrumbList` on `/blog`
  (`src/lib/structured-data.ts`).
- `robots.txt` explicitly welcomes answer-engine crawlers (GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended, …); `public/llms.txt` gives them a concise,
  linkable summary of who Aditya is and what he's built.
- A visible **Quick answers** section whose copy matches the FAQ structured data.
- Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in the environment to add the
  Search Console verification meta tag.

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
the hero grid freezes, reveals resolve instantly, the marquee stops, and the
custom cursor snaps with no trail.
