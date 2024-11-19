import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { DATA } from '@/constants';
import { fontPrompt } from '@/app/fonts';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords: [
    'React 19',
    'nextjs',
    'personal portfolio',
    'developer portfolio',
    'reactjs',
  ],
  authors: [
    {
      name: DATA.username,
      url: DATA.url,
    },
  ],
  creator: DATA.name,
  openGraph: {
    title: DATA.name,
    description: DATA.description,
    url: DATA.url,
    siteName: DATA.name,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${DATA.url}/og.png`,
        width: 1200,
        height: 630,
        alt: DATA.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DATA.name,
    description: DATA.description,
    creator: '@codebyaadi',
    images: [
      {
        url: `${DATA.url}/og.png`,
        alt: DATA.name,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fontPrompt.variable} mx-auto min-h-screen max-w-2xl bg-background px-6 py-12 font-sans antialiased sm:py-24`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
