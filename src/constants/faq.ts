export interface Faq {
  q: string;
  a: string;
}

/**
 * Short, factual answers — also emitted as FAQPage structured data, so the
 * wording here must match what renders on the page.
 */
export const faqs: Faq[] = [
  {
    q: 'What does Aditya Rajbhar do?',
    a: 'Aditya is a software engineer from India. He is a Full Stack Developer at BrainFog Technologies, building web, mobile and AI-automation systems. Outside work he builds Upzy (uptime and security monitoring), Lookfar (self-hosted watcher agents), Avni (a voice assistant) and Keel (a SaaS starter kit).',
  },
  {
    q: 'What is his technical stack?',
    a: 'Day to day: TypeScript with React and Next.js on the front end; Node.js, ElysiaJS, NestJS, FastAPI, Go and Rust on the back end, with SvelteKit and Kotlin where they fit; PostgreSQL, Firestore, Redis and Prisma/Drizzle for data; Docker, Turborepo and Google Cloud for infrastructure.',
  },
  {
    q: 'Is he open to new opportunities?',
    a: 'Yes — Aditya is open to roles and projects involving full-stack product work, distributed systems, or AI agents and tooling.',
  },
  {
    q: 'How do you get in touch?',
    a: 'The fastest way is a direct message on X (@codebyaadi). He’s also on GitHub and LinkedIn as codebyaadi.',
  },
];
