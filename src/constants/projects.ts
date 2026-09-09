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
 * Featured work, most substantial first. Copy is drawn from each repo's own
 * README / description — nothing invented.
 */
export const projects: Project[] = [
  {
    slug: 'upzy',
    name: 'Upzy',
    year: '2026',
    category: 'Platform',
    tagline: 'Uptime & performance monitoring',
    description:
      'A monitoring platform in the spirit of BetterStack — uptime checks, incident alerting and status pages — built as a Turborepo monorepo with a microservices-first architecture.',
    highlights: [
      'Turborepo monorepo: Next.js web app + NestJS services',
      'PostgreSQL with Drizzle ORM and Better Auth for sessions',
      'Designed to scale check workers independently of the API',
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
    tagline: 'Structural backbone for a SaaS app',
    description:
      'An opinionated Bun + Turborepo monorepo that wires up the parts every SaaS needs — typed API, auth with organisations, transactional email, a shared component kit and a validated environment.',
    highlights: [
      'ElysiaJS API on Bun, Next.js App Router web app',
      'Prisma 8 data layer, Better Auth with org + admin plugins',
      'React Email via Resend, oxlint / oxfmt, Docker Postgres + Redis',
    ],
    stack: ['Bun', 'Turborepo', 'Next.js', 'ElysiaJS', 'Prisma', 'Better Auth'],
    links: [{ label: 'Source', href: 'https://github.com/codebyaadi/keel' }],
  },
  {
    slug: 'feedoku',
    name: 'Feedoku',
    year: '2025',
    category: 'Backend',
    tagline: 'RSS feed aggregator',
    description:
      'An RSS aggregator that collects, organises and serves feeds from one place — a Go API with a Next.js reader, exploring a scalable feed-processing architecture.',
    highlights: [
      'RESTful API written in Go, Next.js web client',
      'PostgreSQL for storage, Redis for content caching',
      'Kafka pipeline planned for real-time feed updates',
    ],
    stack: ['Go', 'Next.js', 'PostgreSQL', 'Redis', 'Kafka'],
    links: [{ label: 'Source', href: 'https://github.com/codebyaadi/feedoku' }],
  },
  {
    slug: 'bookit',
    name: 'BookIt',
    year: '2024',
    category: 'Full-stack app',
    tagline: 'Event booking system',
    description:
      'A full-stack event management and booking application with a FastAPI backend and a Next.js front end — browse events, book seats and manage listings.',
    highlights: [
      'FastAPI service with SQLAlchemy over the event/booking model',
      'Next.js + TypeScript client with typed API access',
      'Uvicorn-served Python API, SQLite persistence',
    ],
    stack: ['Next.js', 'FastAPI', 'Python', 'SQLAlchemy', 'TypeScript'],
    links: [{ label: 'Source', href: 'https://github.com/codebyaadi/bookit' }],
  },
  {
    slug: 'vitube',
    name: 'Vitube',
    year: '2024',
    category: 'Product',
    tagline: 'Video streaming platform',
    description:
      'A video streaming and sharing platform built on the MERN stack, with Cloudinary handling media storage and delivery and Nodemailer for transactional email.',
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
  {
    slug: 'refine-dashboard',
    name: 'Refine Dashboard',
    year: '2024',
    category: 'Internal tools',
    tagline: 'Admin panel with Refine + GraphQL',
    description:
      'A customisable admin dashboard for managing and visualising data, built with Refine and Ant Design over a NestJS GraphQL API.',
    highlights: [
      'Refine handles auth, access control, routing and data fetching',
      'Ant Design component system with a NestJS Query data provider',
      'GraphQL API layer, React Router navigation',
    ],
    stack: ['React', 'Refine', 'Ant Design', 'NestJS', 'GraphQL'],
    links: [
      { label: 'Live', href: 'https://refine-dashboard-ant.netlify.app/' },
      {
        label: 'Source',
        href: 'https://github.com/codebyaadi/refine-dashboard',
      },
    ],
  },
];

export interface MoreProject {
  name: string;
  blurb: string;
  href: string;
}

/** Smaller experiments and tools, shown as a compact list. */
export const moreProjects: MoreProject[] = [
  {
    name: 'gemini-rag-api',
    blurb:
      'Retrieval-augmented-generation API built on Google’s Gemini models.',
    href: 'https://github.com/codebyaadi/gemini-rag-api',
  },
  {
    name: 'utilstash',
    blurb: 'Published TypeScript utility package with typed helpers and docs.',
    href: 'https://github.com/codebyaadi/utilstash',
  },
  {
    name: 'monkey-interpreter',
    blurb: 'A tree-walking interpreter written from scratch in Go.',
    href: 'https://github.com/codebyaadi/monkey-interpreter',
  },
  {
    name: 'Chatpiece',
    blurb: 'Social app for posts and comments — Next.js, Prisma, PostgreSQL.',
    href: 'https://github.com/codebyaadi/chatpiece',
  },
  {
    name: 'DALL·E Clone',
    blurb: 'Text-to-image generator using OpenAI’s DALL·E API.',
    href: 'https://github.com/codebyaadi/dalle-e-clone',
  },
  {
    name: 'movies-api-springboot',
    blurb: 'REST API for movies and reviews, built with Java and Spring Boot.',
    href: 'https://github.com/codebyaadi/movies-api-springboot',
  },
];
