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
    a: 'Aditya is a software engineer from India. He builds full-stack web applications and backend systems — including the web platform for Landmark Aquatec’s water-treatment products, and open-source work like Upzy and Keel.',
  },
  {
    q: 'What is his technical stack?',
    a: 'Day to day: TypeScript with React and Next.js on the front end; Node.js, NestJS, FastAPI and Go on the back end; PostgreSQL, Firestore, Redis and Prisma/Drizzle for data; Docker, Turborepo and Google Cloud for infrastructure.',
  },
  {
    q: 'Is he open to new opportunities?',
    a: 'Yes — Aditya is open to roles and projects involving full-stack product work, distributed systems, or AI-assisted tooling.',
  },
  {
    q: 'How do you get in touch?',
    a: 'The fastest way is a direct message on X (@codebyaadi). He’s also on GitHub and LinkedIn as codebyaadi.',
  },
];
