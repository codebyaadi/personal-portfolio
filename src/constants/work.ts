export interface WorkItem {
  company: string;
  href: string;
  title: string;
  location: string;
  start: string;
  end: string | null;
  summary: string;
  stack: string[];
}

export const work: WorkItem[] = [
  {
    company: 'BrainFog Technologies',
    href: 'https://brainfogagency.com/',
    title: 'Full Stack Developer',
    location: 'Mumbai, India',
    start: 'Sep 2026',
    end: null,
    summary:
      'Building across the whole product surface: native Android apps in Kotlin, full-stack web apps on Next.js and Prisma, Python backends, and AI agents and automation with LangChain, LangGraph and MCP. It’s also where I picked up Kotlin.',
    stack: [
      'Kotlin',
      'Android',
      'Next.js',
      'Prisma',
      'Python',
      'LangChain',
      'LangGraph',
      'MCP',
    ],
  },
  {
    company: 'Landmark Aquatec',
    href: 'https://landmarkaquatec.com/',
    title: 'Software Developer',
    location: 'Mumbai, India',
    start: 'May 2024',
    end: 'Sep 2026',
    summary:
      'Built the web platform behind the company’s water- and sewage-treatment products: real-time dashboards over live plant telemetry (sensors, pumps, valves), status and service reporting, and role-based administration for sites and customers. FastAPI services on Google Cloud with Firestore, behind a React / Next.js front end.',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'FastAPI',
      'Python',
      'Google Cloud',
      'Firestore',
    ],
  },
];
