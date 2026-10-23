export interface SkillGroup {
  category: string;
  items: string[];
}

/** Grouped tech — what actually shows up across my repos and my work. */
export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    items: [
      'TypeScript',
      'JavaScript',
      'Python',
      'Go',
      'Rust',
      'Kotlin',
      'Java',
    ],
  },
  {
    category: 'Frontend',
    items: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'shadcn/ui',
      'SvelteKit',
      'Astro',
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
      'Better Auth',
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
      'pgvector',
      'SQLite',
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
    items: [
      'MCP',
      'LangGraph',
      'Agents & tool use',
      'OpenAI API',
      'Google Gemini',
      'RAG pipelines',
    ],
  },
];
