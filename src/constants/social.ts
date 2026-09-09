import type { ComponentType, SVGProps } from 'react';
import { GithubIcon, LinkedinIcon, XIcon } from '@/components/icons';

export interface SocialLink {
  name: string;
  handle: string;
  url: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const socials: SocialLink[] = [
  {
    name: 'GitHub',
    handle: '@codebyaadi',
    url: 'https://github.com/codebyaadi',
    icon: GithubIcon,
  },
  {
    name: 'LinkedIn',
    handle: 'in/codebyaadi',
    url: 'https://www.linkedin.com/in/codebyaadi',
    icon: LinkedinIcon,
  },
  {
    name: 'X',
    handle: '@codebyaadi',
    url: 'https://x.com/codebyaadi',
    icon: XIcon,
  },
];

/** Preferred way to reach out, mirrored from the previous site. */
export const contactNote =
  'The fastest way to reach me is a direct message on X with a specific question — I’ll reply when I can. I ignore cold sales pitches.';
