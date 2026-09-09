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

/** Preferred way to reach out. */
export const contactNote =
  'I’m always up for a good problem — a product to build, a system to untangle, or a role worth moving for. A direct message on X with a real question is the fastest way in. Cold sales pitches get ignored.';
