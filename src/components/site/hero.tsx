import type { CSSProperties } from 'react';
import { ArrowDown } from 'lucide-react';
import { HeroGrid } from '@/components/site/hero-grid';
import { AnimatedWords } from '@/components/ui/reveal';
import { Magnetic } from '@/components/ui/magnetic';
import { personal, socials } from '@/constants';

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section
      id='home'
      aria-labelledby='hero-heading'
      className='relative flex min-h-[100svh] flex-col justify-center overflow-hidden'
    >
      <div className='grid-bg pointer-events-none absolute inset-0' />
      <div className='pointer-events-none absolute -top-1/3 left-1/2 h-[50rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_68%)] blur-3xl' />
      <HeroGrid />

      <div className='relative mx-auto w-full max-w-6xl px-6 pt-28 pb-24'>
        <p
          className='animate-fade-rise text-faint flex items-center gap-3 font-mono text-xs tracking-[0.18em] uppercase sm:text-sm'
          style={delay(0)}
        >
          <span className='relative flex size-2'>
            <span className='bg-accent absolute inline-flex size-full animate-ping rounded-full opacity-60' />
            <span className='bg-accent relative inline-flex size-2 rounded-full' />
          </span>
          {personal.tagline}
        </p>

        <h1
          id='hero-heading'
          className='mt-6 text-[clamp(3rem,13vw,10rem)] leading-[0.92] font-semibold tracking-[-0.03em]'
        >
          <AnimatedWords
            as='span'
            text='Aditya'
            className='block'
            wordClassName='text-gradient'
            startDelay={120}
          />
          <AnimatedWords
            as='span'
            text='Rajbhar'
            className='block'
            wordClassName='text-gradient'
            startDelay={260}
          />
          <span className='sr-only'>
            {' '}
            — {personal.role}, full-stack &amp; systems developer from{' '}
            {personal.location}
          </span>
        </h1>

        <p
          className='animate-fade-rise text-muted mt-8 max-w-2xl text-lg leading-relaxed sm:text-2xl'
          style={delay(520)}
        >
          I build software that holds up under load —{' '}
          <span className='text-foreground font-serif text-[1.12em] italic'>
            considered interfaces, honest APIs
          </span>
          , and systems that scale without drama.
        </p>

        <div
          className='animate-fade-rise mt-10 flex flex-wrap items-center gap-x-3 gap-y-4'
          style={delay(620)}
        >
          <Magnetic strength={0.4}>
            <a
              href='#projects'
              className='group bg-accent text-accent-contrast hover:bg-accent-strong inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors'
            >
              View Projects
              <span className='transition-transform duration-300 group-hover:translate-x-1'>
                →
              </span>
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href='#contact'
              className='border-border-strong hover:border-accent hover:text-accent inline-flex items-center rounded-full border px-6 py-3 text-sm font-medium transition-colors'
            >
              Let’s Connect
            </a>
          </Magnetic>
        </div>

        <ul
          className='animate-fade-rise mt-12 flex items-center gap-6'
          style={delay(720)}
        >
          {socials.map(({ name, url, handle, icon: Icon }) => (
            <li key={name}>
              <a
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className='group text-faint hover:text-foreground flex items-center gap-2 text-sm transition-colors'
              >
                <Icon className='size-4' />
                <span className='hidden font-mono text-xs sm:inline'>
                  {handle}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <a
        href='#about'
        aria-label='Scroll to about section'
        className='animate-fade-rise text-faint absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-widest uppercase sm:flex'
        style={delay(900)}
      >
        Scroll
        <ArrowDown className='size-3 animate-bounce' />
      </a>
    </section>
  );
}
