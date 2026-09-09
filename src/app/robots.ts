import type { MetadataRoute } from 'next';
import { personal } from '@/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${personal.url}/sitemap.xml`,
    host: personal.url,
  };
}
