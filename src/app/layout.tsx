import type { Metadata, Viewport } from 'next';
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Space_Grotesk,
} from 'next/font/google';
import Script from 'next/script';

import { Nav } from '@/components/site/nav';
import { Cursor } from '@/components/cursor';
import { HashScroll } from '@/components/hash-scroll';
import { RevealObserver } from '@/components/reveal-observer';
import { ThemeScript } from '@/components/theme-script';
import { personal, socials } from '@/constants';
import './globals.css';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});
const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
});
const serif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: '400',
  style: ['normal', 'italic'],
});

const title = `${personal.name} — ${personal.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(personal.url),
  title: { default: title, template: `%s · ${personal.name}` },
  description: personal.description,
  applicationName: `${personal.name} — Portfolio`,
  category: 'technology',
  manifest: '/manifest.webmanifest',
  alternates: { canonical: '/' },
  keywords: [
    'Aditya Rajbhar',
    'codebyaadi',
    'software engineer',
    'full-stack developer',
    'Next.js developer',
    'React developer',
    'TypeScript',
    'Go developer',
    'FastAPI',
    'Google Cloud',
    'distributed systems',
    'portfolio',
    'India',
  ],
  authors: [{ name: personal.name, url: personal.url }],
  creator: personal.name,
  publisher: personal.name,
  formatDetection: { email: false, telephone: false, address: false },
  openGraph: {
    type: 'profile',
    firstName: 'Aditya',
    lastName: 'Rajbhar',
    username: personal.username,
    locale: 'en_IN',
    url: personal.url,
    siteName: `${personal.name} — Portfolio`,
    title,
    description: personal.description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: personal.description,
    creator: '@codebyaadi',
    site: '@codebyaadi',
  },
  appleWebApp: {
    capable: true,
    title: personal.name,
    statusBarStyle: 'black-translucent',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#131316' },
    { media: '(prefers-color-scheme: light)', color: '#fcfcfd' },
  ],
  colorScheme: 'dark light',
};

const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        {socials.map((s) => (
          <link key={s.name} rel='me' href={s.url} />
        ))}
      </head>
      <body className='min-h-dvh antialiased'>
        <a
          href='#main-content'
          className='focus:bg-accent focus:text-accent-contrast sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:px-4 focus:py-2 focus:text-sm'
        >
          Skip to content
        </a>
        <div className='noise-layer' aria-hidden />
        <Cursor />
        <Nav />
        <main id='main-content'>{children}</main>
        <HashScroll />
        <RevealObserver />
        {umamiWebsiteId ? (
          <Script
            src='https://cloud.umami.is/script.js'
            data-website-id={umamiWebsiteId}
            strategy='afterInteractive'
          />
        ) : null}
      </body>
    </html>
  );
}
