import { ArrowDown } from 'lucide-react';
import { Stats } from '@/components/site/stats';
import { AnimatedWords } from '@/components/ui/reveal';
import { personal, socials } from '@/constants';

export function Hero() {
  return (
    <section
      id='home'
      aria-labelledby='hero-heading'
      className='relative flex min-h-[100svh] flex-col justify-center overflow-hidden'
    >
      <div className='grid-bg pointer-events-none absolute inset-0' />
      <div className='pointer-events-none absolute -top-1/3 left-1/2 h-[50rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_68%)] blur-3xl' />

      <div className='animate-fade-rise relative mx-auto w-full max-w-6xl px-6 pt-28 pb-24'>
        <p className='text-faint flex items-center gap-3 font-mono text-xs tracking-[0.18em] uppercase sm:text-sm'>
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
            autoPlay
            startDelay={100}
          />
          <AnimatedWords
            as='span'
            text='Rajbhar'
            className='block'
            wordClassName='text-gradient'
            autoPlay
            startDelay={220}
          />
        </h1>

        <p className='mt-3 text-[clamp(1.5rem,5.5vw,3.25rem)] leading-[0.95] font-extrabold tracking-tight uppercase'>
          <AnimatedWords
            as='span'
            text='Software'
            className='block'
            autoPlay
            startDelay={420}
          />
          <AnimatedWords
            as='span'
            text='Engineer, full-stack'
            className='block'
            wordClassName='text-faint'
            autoPlay
            startDelay={480}
          />
        </p>

        <p className='text-muted mt-8 max-w-2xl text-lg leading-relaxed sm:text-2xl'>
          I build software that holds up under load —{' '}
          <span className='text-accent font-semibold'>
            considered interfaces, honest APIs
          </span>
          , and systems that scale without drama.
        </p>

        <div className='mt-10'>
          <Stats />
        </div>

        <div className='mt-10 flex flex-wrap items-center gap-x-3 gap-y-4'>
          <a
            href='#projects'
            className='group bg-accent text-accent-contrast hover:bg-accent-strong inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[background-color,transform] duration-200 active:scale-[0.97]'
          >
            View Projects
            <span className='transition-transform duration-300 group-hover:translate-x-1'>
              →
            </span>
          </a>
          <a
            href='#contact'
            className='border-border-strong hover:border-accent hover:text-accent inline-flex items-center rounded-full border px-6 py-3 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97]'
          >
            Let’s Connect
          </a>
        </div>

        <p className='text-faint mt-10 max-w-2xl font-mono text-xs leading-relaxed sm:text-sm'>
          <span className='text-accent'>Now:</span> Full Stack Developer at
          BrainFog. Building{' '}
          <a href='#projects' className='text-foreground hover:text-accent'>
            Upzy, Lookfar and Avni
          </a>{' '}
          on the side.
        </p>

        <ul className='mt-8 flex flex-wrap items-center gap-6'>
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
        className='text-faint absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-widest uppercase sm:flex'
      >
        Scroll
        <ArrowDown className='size-3' />
      </a>
    </section>
  );
}
