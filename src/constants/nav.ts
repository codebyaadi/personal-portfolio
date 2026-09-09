export interface NavItem {
  id: string;
  label: string;
  href: string;
}

/** In-page sections tracked for active-link highlighting. */
export const sectionNav: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

/** Extra links shown in the nav that route elsewhere. */
export const routeNav: NavItem[] = [
  { id: 'blog', label: 'Blog', href: '/blog' },
];
