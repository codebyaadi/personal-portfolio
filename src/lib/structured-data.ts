import { faqs } from '@/constants/faq';
import { personal } from '@/constants/personal';
import { projects } from '@/constants/projects';
import { skillGroups } from '@/constants/skills';
import { socials } from '@/constants/social';
import { work } from '@/constants/work';
import type { BlogPost } from '@/constants/blog';

const site = personal.url;

const person = {
  '@type': 'Person',
  '@id': `${site}/#person`,
  name: personal.name,
  alternateName: personal.username,
  url: site,
  image: `${site}/me.jpeg`,
  jobTitle: personal.role,
  description: personal.description,
  worksFor: {
    '@type': 'Organization',
    name: work[0]?.company,
    url: work[0]?.href,
  },
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  sameAs: socials.map((s) => s.url),
  knowsAbout: [
    ...new Set(skillGroups.flatMap((g) => g.items)),
    'Full-stack web development',
    'Distributed systems',
    'Web performance',
    'IoT dashboards',
    'API design',
  ],
  knowsLanguage: ['en'],
};

const website = {
  '@type': 'WebSite',
  '@id': `${site}/#website`,
  url: site,
  name: `${personal.name} — Portfolio`,
  description: personal.description,
  publisher: { '@id': `${site}/#person` },
  inLanguage: 'en',
};

/** JSON-LD graph for the home page. */
export function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      website,
      {
        '@type': 'ProfilePage',
        '@id': `${site}/#profilepage`,
        url: site,
        name: `${personal.name} — ${personal.role}`,
        isPartOf: { '@id': `${site}/#website` },
        about: { '@id': `${site}/#person` },
        primaryImageOfPage: `${site}/opengraph-image`,
        inLanguage: 'en',
      },
      {
        '@type': 'ItemList',
        name: 'Selected projects by Aditya Rajbhar',
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'SoftwareSourceCode',
            name: p.name,
            description: p.description,
            codeRepository: p.links.find((l) => l.label === 'Source')?.href,
            url:
              p.links.find((l) => l.label === 'Live')?.href ?? p.links[0]?.href,
            programmingLanguage: p.stack,
            author: { '@id': `${site}/#person` },
          },
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${site}/#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

/** JSON-LD graph for the /blog page. */
export function blogJsonLd(posts: BlogPost[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${site}/blog#blog`,
        url: `${site}/blog`,
        name: `Writing — ${personal.name}`,
        description:
          'Notes on software development, the web platform, and building things.',
        author: { '@id': `${site}/#person` },
        publisher: { '@id': `${site}/#person` },
        inLanguage: 'en',
        blogPost: posts.slice(0, 20).map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: p.url,
          datePublished: p.publishedAt,
          author: { '@id': `${site}/#person` },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Writing',
            item: `${site}/blog`,
          },
        ],
      },
    ],
  };
}
