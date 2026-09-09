export interface ProjectLink {
  label: 'Source' | 'Live';
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  year: string;
  category: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  /** Optional real screenshot; otherwise a designed cover is rendered. */
  image?: string;
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
    tagline: 'Uptime monitoring that goes further',
    description:
      'A monitoring platform in the spirit of BetterStack — fast uptime checks, smart incident alerts and status pages — built as a Turborepo monorepo with a microservices-first architecture so the parts that do the work can scale on their own.',
    highlights: [
      'Next.js dashboard and NestJS services in one Turborepo',
      'PostgreSQL via Drizzle, sessions handled by Better Auth',
      'Check workers designed to scale independently of the API',
    ],
    stack: [
      'Next.js',
      'NestJS',
      'TypeScript',
      'PostgreSQL',
      'Drizzle',
      'Turborepo',
    ],
    links: [{ label: 'Source', href: 'https://github.com/codebyaadi/upzy' }],
  },
  {
    slug: 'keel',
    name: 'Keel',
    year: '2026',
    category: 'Infrastructure',
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
  {
    slug: 'feedoku',
    name: 'Feedoku',
    year: '2025',
    category: 'Backend',
    tagline: 'A backend built to prove a point',
    description:
      'An open-source RSS aggregator written to push on high-performance backend work in Go — feed collection, caching and search over a scalable, message-driven pipeline, with a Next.js reader on top.',
    highlights: [
      'RESTful API in Go, PostgreSQL for storage, Redis for caching',
      'Kafka pipeline for feed collection and processing',
      'Full-text search across every subscribed feed',
    ],
    stack: ['Go', 'Next.js', 'PostgreSQL', 'Redis', 'Kafka'],
    links: [{ label: 'Source', href: 'https://github.com/codebyaadi/feedoku' }],
  },
  {
    slug: 'vitube',
    name: 'Vitube',
    year: '2024',
    category: 'Product',
    tagline: 'A video platform, end to end',
    description:
      'A full video streaming and sharing product on the MERN stack — upload, playback and sharing, with Cloudinary handling media storage and delivery and Nodemailer driving the auth and notification email.',
    highlights: [
      'Video upload, storage and streaming through Cloudinary',
      'Authentication and email flows via Nodemailer',
      'React + Vite front end over a Node / Express API',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    image:
      'https://res.cloudinary.com/dh2xj1szg/image/upload/v1732034341/vitube-streaming-platform_txkfoc.png',
    links: [
      { label: 'Live', href: 'https://vitube-streaming-platform.vercel.app/' },
      {
        label: 'Source',
        href: 'https://github.com/codebyaadi/vitube-streaming-platform',
      },
    ],
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
