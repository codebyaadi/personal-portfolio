import { ArrowUpRight } from 'lucide-react';
import { AnimatedWords } from '@/components/ui/reveal';
import { contactNote, socials } from '@/constants';

export function Contact() {
  return (
    <section
      id='contact'
      aria-labelledby='contact-heading'
      className='relative scroll-mt-20 overflow-hidden pt-28 pb-24 sm:pt-40 sm:pb-28'
    >
      <div className='grid-bg pointer-events-none absolute inset-0' />
      <div className='pointer-events-none absolute -bottom-1/2 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_70%)] blur-3xl' />

      <div className='relative mx-auto max-w-6xl px-6 text-center' data-reveal>
        <p className='text-faint font-mono text-xs tracking-[0.18em] uppercase'>
          06 — Contact
        </p>
        <h2
          id='contact-heading'
          className='mx-auto mt-6 text-[clamp(2.5rem,9vw,6.5rem)] leading-[0.92] font-extrabold tracking-tight uppercase'
        >
          <AnimatedWords as='span' text='Have an idea' className='block' />
          <AnimatedWords
            as='span'
            text='worth building?'
            className='block'
            wordClassName='text-faint'
            startDelay={80}
          />
        </h2>
        <p className='text-muted mx-auto mt-7 max-w-xl leading-relaxed'>
          {contactNote}
        </p>

        <div className='mt-12 flex justify-center'>
          <a
            href={socials.find((s) => s.name === 'X')?.url ?? '#'}
            target='_blank'
            rel='noopener noreferrer'
            className='group bg-accent text-accent-contrast hover:bg-accent-strong inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium transition-[background-color,transform] duration-200 active:scale-[0.97]'
          >
            Start a conversation
            <ArrowUpRight className='size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
          </a>
        </div>

        <ul className='mx-auto mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4'>
          {socials.map(({ name, handle, url, icon: Icon }) => (
            <li key={name}>
              <a
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className='group text-muted hover:text-foreground flex items-center gap-2.5 text-sm transition-colors'
              >
                <Icon className='group-hover:text-accent size-4 transition-colors' />
                <span className='font-mono text-xs'>{handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
