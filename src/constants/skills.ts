export interface SkillGroup {
  category: string;
  items: string[];
}

/** Grouped tech, drawn from what shows up across my repos and day-to-day work. */
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
      'Express',
      'FastAPI',
      'Spring Boot',
      'GraphQL',
    ],
  },
  {
    category: 'Data',
    items: [
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Prisma',
      'Drizzle',
      'SQLAlchemy',
    ],
  },
  {
    category: 'Infra & Tooling',
    items: ['Docker', 'Turborepo', 'Bun', 'Kafka', 'Vercel', 'Netlify', 'Git'],
  },
  {
    category: 'AI',
    items: ['OpenAI API', 'Google Gemini', 'RAG pipelines'],
  },
];
