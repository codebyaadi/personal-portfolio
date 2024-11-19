import { Prompt } from 'next/font/google';

export const fontPrompt = Prompt({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-prompt',
  display: 'swap',
});
