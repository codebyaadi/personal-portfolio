import type { MetadataRoute } from 'next';
import { personal } from '@/constants';

/** Answer-engine and AI-search crawlers — explicitly welcomed. */
const answerEngines = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'Bytespider',
  'CCBot',
  'cohere-ai',
  'DuckAssistBot',
  'Meta-ExternalAgent',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: answerEngines, allow: '/' },
    ],
    sitemap: `${personal.url}/sitemap.xml`,
    host: personal.url,
  };
}
