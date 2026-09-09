import type { MetadataRoute } from 'next';
import { personal } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: personal.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${personal.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];
}
