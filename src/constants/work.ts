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
    end: null,
    summary:
      'Building and maintaining web applications for the company’s products — admin dashboards and internal tooling across the TypeScript stack.',
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
];
