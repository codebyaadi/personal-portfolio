export interface ProjectLink {
  label: 'Source' | 'Live';
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  year: string;
  category: string;
  /** Honest state of the project, shown next to the category. */
  status: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  /** Optional real screenshot; otherwise a designed cover is rendered. */
  image?: string;
  /** No Source link means the repo is private; the card says so. */
  links: ProjectLink[];
}

/**
 * Featured work — only projects with real depth behind them. Copy is drawn
 * from each repo's own README / description; nothing is invented.
 */
export const projects: Project[] = [
  {
    slug: 'upzy',
    name: 'Upzy',
    year: '2026',
    category: 'Platform',
    status: 'In development',
    tagline: 'Know it’s down before your customers do',
    description:
      'Uptime monitoring and external attack-surface security for small teams, in one tool. Checks run every minute, passive scans grade each site A to F, and every finding comes with the exact fix for your stack and a Verify fix button.',
    highlights: [
      'HTTP, TCP, DNS and SSL checks, heartbeats, and public status pages with custom domains',
      'Passive scans for certificates, headers, SPF/DMARC, subdomain takeover and CVEs ranked with CISA KEV and EPSS',
      'SSRF-safe probes that pin the resolved address at connect time; opt-in AI on your own key',
    ],
    stack: [
      'Bun',
      'Turborepo',
      'ElysiaJS',
      'Next.js',
      'PostgreSQL',
      'Drizzle',
      'Better Auth',
    ],
    links: [
      { label: 'Live', href: 'https://upzy.codebyaadi.com' },
      { label: 'Source', href: 'https://github.com/codebyaadi/upzy-oss' },
    ],
  },
  {
    slug: 'lookfar',
    name: 'Lookfar',
    year: '2026',
    category: 'AI agents',
    status: 'In development',
    tagline: 'Agents that look far, so you don’t have to',
    description:
      'Self-hosted watcher agents you can leave running. Describe what to watch in plain language and Lookfar checks pages, feeds and repos on a schedule, reports only what matters, and asks before it acts on your behalf. It grew out of Feedoku, my earlier RSS aggregator.',
    highlights: [
      'No change, no tokens: a free fetch, normalise, hash and diff gate runs before any model is called',
      'Anything with side effects waits in an approvals inbox with the exact payload shown',
      'Postgres job queue on FOR UPDATE SKIP LOCKED, SSRF-guarded fetcher, hashed API tokens',
    ],
    stack: [
      'Go',
      'SvelteKit',
      'PostgreSQL',
      'pgvector',
      'Better Auth',
      'Docker',
    ],
    links: [
      { label: 'Live', href: 'https://lookfar.codebyaadi.com' },
      { label: 'Source', href: 'https://github.com/codebyaadi/lookfar' },
    ],
  },
  {
    slug: 'avni',
    name: 'Avni',
    year: '2026',
    category: 'Voice AI',
    status: 'In development',
    tagline: 'A voice layer for everything you own',
    description:
      'A speech-first personal assistant that answers in about a second, acts on your devices and services, and asks before anything risky. An Android app talks to a single Rust core that routes each request to the cheapest model tier that can handle it.',
    highlights: [
      'Measured over 117 real turns: p50 about 1.0 s from speech-to-text done to first reply text',
      'Tiered router: on-device rules, then a fast LLM, then a strong LLM, then background agent jobs',
      'Every STT, TTS and LLM is a swappable provider; tools and skills plug in over MCP',
    ],
    stack: ['Rust', 'Kotlin', 'Android', 'MCP', 'SQLite', 'Astro'],
    links: [{ label: 'Live', href: 'https://avni.codebyaadi.com' }],
  },
  {
    slug: 'keel',
    name: 'Keel',
    year: '2026',
    category: 'Infrastructure',
    status: 'Open source',
    tagline: 'The backbone every SaaS ends up rebuilding',
    description:
      'An opinionated Bun + Turborepo monorepo that wires up the boring-but-critical parts once — a typed API, auth with organisations and admin, transactional email, a shared component kit and a validated environment — so a real product can start on day one.',
    highlights: [
      'ElysiaJS API on Bun, Next.js App Router web app',
      'Prisma 8 data layer, Better Auth with org + admin plugins',
      'React Email via Resend, zod-validated env, oxlint / oxfmt',
    ],
    stack: ['Bun', 'Turborepo', 'Next.js', 'ElysiaJS', 'Prisma', 'Better Auth'],
    links: [{ label: 'Source', href: 'https://github.com/codebyaadi/keel' }],
  },
];

export interface MoreProject {
  name: string;
  blurb: string;
  href: string;
}

/** Smaller shipped things — each one is live or published. */
export const moreProjects: MoreProject[] = [
  {
    name: 'Vitube',
    blurb:
      'A live video streaming and sharing platform on the MERN stack with Cloudinary.',
    href: 'https://vitube-streaming-platform.vercel.app/',
  },
  {
    name: 'utilstash',
    blurb:
      'A published TypeScript utility package — typed helpers, docs, and open to contributors.',
    href: 'https://github.com/codebyaadi/utilstash',
  },
  {
    name: 'Refine Dashboard',
    blurb:
      'A live admin panel on Refine + Ant Design over a NestJS GraphQL API.',
    href: 'https://refine-dashboard-ant.netlify.app/',
  },
  {
    name: 'movies-api',
    blurb:
      'A deployed REST API for movies and reviews, built with Java and Spring Boot.',
    href: 'https://github.com/codebyaadi/movies-api-springboot',
  },
  {
    name: 'Chatpiece',
    blurb:
      'A deployed social app for posts and comments — Next.js, Prisma, PostgreSQL.',
    href: 'https://chatpiece.vercel.app',
  },
  {
    name: 'DALL·E Clone',
    blurb: 'A live text-to-image generator wired to OpenAI’s DALL·E API.',
    href: 'https://dalle-e-clone-rho.vercel.app/',
  },
];
