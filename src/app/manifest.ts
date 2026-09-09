import type { MetadataRoute } from 'next';
import { personal } from '@/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${personal.name} — ${personal.role}`,
    short_name: personal.name,
    description: personal.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#131316',
    theme_color: '#131316',
    lang: 'en',
    categories: ['portfolio', 'technology'],
    icons: [
      { src: '/icon', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
