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
    company: 'Landmark Aquatec',
    href: 'https://landmarkaquatec.com/',
    title: 'Software Developer',
    location: 'Mumbai, India',
    start: 'May 2024',
    end: 'Sep 2026',
    summary:
      'Building the web platform behind the company’s water- and sewage-treatment products — real-time dashboards for plant telemetry (sensors, pumps, valves), status and service reporting, and role-based site and customer administration. FastAPI services on Google Cloud with Firestore, a React / Next.js front end.',
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
