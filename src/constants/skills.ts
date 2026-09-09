export interface SkillGroup {
  category: string;
  items: string[];
}

/** Grouped tech — what actually shows up across my repos and my work. */
export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Java'],
  },
  {
    category: 'Frontend',
    items: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'shadcn/ui',
      'Ant Design',
      'React Query',
    ],
  },
  {
    category: 'Backend',
    items: [
      'Node.js',
      'NestJS',
      'ElysiaJS',
      'FastAPI',
      'Express',
      'Spring Boot',
      'GraphQL',
    ],
  },
  {
    category: 'Data',
    items: [
      'PostgreSQL',
      'Firestore',
      'MongoDB',
      'Redis',
      'Prisma',
      'Drizzle',
      'Kafka',
    ],
  },
  {
    category: 'Cloud & Infra',
    items: [
      'Google Cloud',
      'AWS',
      'Docker',
      'Turborepo',
      'Bun',
      'Vercel',
      'Netlify',
    ],
  },
  {
    category: 'AI',
    items: ['OpenAI API', 'Google Gemini', 'RAG pipelines'],
  },
];
