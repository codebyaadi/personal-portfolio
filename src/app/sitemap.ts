import type { MetadataRoute } from 'next';
import { personal } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: personal.url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      images: [`${personal.url}/opengraph-image`],
    },
    {
      url: `${personal.url}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];
}
