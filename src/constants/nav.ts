export interface NavItem {
  id: string;
  label: string;
  href: string;
}

/** In-page sections tracked for active-link highlighting, in page order. */
export const sectionNav: NavItem[] = [
  { id: 'home', label: 'Cover', href: '/#home' },
  { id: 'about', label: 'Profile', href: '/#about' },
  { id: 'projects', label: 'Systems', href: '/#projects' },
  { id: 'experience', label: 'Revisions', href: '/#experience' },
  { id: 'skills', label: 'Stack', href: '/#skills' },
  { id: 'faq', label: 'Notes', href: '/#faq' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
];

/** Extra links shown in the nav that route elsewhere. */
export const routeNav: NavItem[] = [
  { id: 'blog', label: 'Blog', href: '/blog' },
];
