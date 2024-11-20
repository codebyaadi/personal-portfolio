import { Prompt, Unbounded } from 'next/font/google';

export const fontPrompt = Prompt({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-prompt',
  display: 'swap',
});

export const fontUnbounded = Unbounded({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-unbounded',
  display: 'swap',
})
