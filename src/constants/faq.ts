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
    a: 'Aditya is a software engineer from India. He is a Full Stack Developer at BrainFog Technologies, building Android apps in Kotlin, Next.js web apps, Python backends and AI agents. Outside work he builds Upzy (uptime and security monitoring), Lookfar (self-hosted watcher agents), Avni (a voice assistant) and Keel (a SaaS starter kit).',
  },
  {
    q: 'What is his technical stack?',
    a: 'Day to day: TypeScript with React and Next.js on the web and Kotlin on Android; Node.js, ElysiaJS, NestJS, FastAPI, Go and Rust on the back end, with SvelteKit where it fits; PostgreSQL, Firestore, Redis and Prisma/Drizzle for data; LangGraph and MCP for agents; Docker, Turborepo and Google Cloud for infrastructure.',
  },
  {
    q: 'Is he open to new opportunities?',
    a: 'Aditya works full-time at BrainFog Technologies and is not looking for a new role. He is open to side projects and collaborations involving full-stack product work, distributed systems, or AI agents and tooling.',
  },
  {
    q: 'How do you get in touch?',
    a: 'The fastest way is a direct message on X (@codebyaadi). He’s also on GitHub and LinkedIn as codebyaadi.',
  },
];
