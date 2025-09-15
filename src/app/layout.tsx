import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';

import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { DATA } from '@/constants';
import { fontPrompt, fontUnbounded } from '@/app/fonts';
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
  alternates: {
    canonical: '/',
  },
  keywords: [
    'React 19',
    'NextJS Portfolio',
    'NextJS 15',
    'personal portfolio',
    'developer portfolio',
    'reactjs',
    'codebyaadi',
    'Aditya Rajbhar',
    'Aditya Rajbhar Software Developer',
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
  verification: {
    google: process.env.GOOGLE_CONSOLE_KEY,
  },
};

const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fontPrompt.variable} ${fontUnbounded.variable} bg-background mx-auto min-h-screen max-w-2xl px-6 py-12 font-sans antialiased sm:py-24`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={0}>
            {children}
            {umamiWebsiteId && (
              <Script
                src='https://cloud.umami.is/script.js'
                data-website-id={umamiWebsiteId}
                strategy='afterInteractive'
              />
            )}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
