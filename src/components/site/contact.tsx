import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from '@/components/ui/magnetic';
import { contactNote, socials } from '@/constants';

export function Contact() {
  return (
    <section
      id='contact'
      aria-labelledby='contact-heading'
      className='relative scroll-mt-24 overflow-hidden py-28 sm:py-40'
    >
      <div className='grid-bg pointer-events-none absolute inset-0' />
      <div className='pointer-events-none absolute -bottom-1/2 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_70%)] blur-3xl' />

      <div className='relative mx-auto max-w-6xl px-6 text-center'>
        <p
          className='text-faint font-mono text-xs tracking-[0.18em] uppercase'
          data-reveal
        >
          05 — Contact
        </p>
        <h2
          id='contact-heading'
          className='mx-auto mt-6 max-w-4xl text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] font-semibold tracking-[-0.03em]'
          data-reveal
        >
          Have an idea{' '}
          <span className='font-serif italic'>worth building?</span>
        </h2>
        <p
          className='text-muted mx-auto mt-7 max-w-xl leading-relaxed'
          data-reveal
        >
          {contactNote}
        </p>

        <div className='mt-12 flex justify-center' data-reveal>
          <Magnetic strength={0.35}>
            <a
              href={socials.find((s) => s.name === 'X')?.url ?? '#'}
              target='_blank'
              rel='noopener noreferrer'
              className='group bg-accent text-accent-contrast hover:bg-accent-strong inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium transition-colors'
            >
              Start a conversation
              <ArrowUpRight className='size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
            </a>
          </Magnetic>
        </div>

        <ul
          className='mx-auto mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4'
          data-reveal
        >
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
