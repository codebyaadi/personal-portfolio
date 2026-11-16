import { ArrowUpRight } from 'lucide-react';
import { contactNote, socials } from '@/constants';

export function Contact() {
  const x = socials.find((s) => s.name === 'X') ?? socials[0];

  return (
    <section
      id='contact'
      aria-labelledby='contact-heading'
      className='relative overflow-hidden'
    >
      <div
        className='sheet-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]'
        aria-hidden
      />
      <div className='relative mx-auto max-w-[86rem] px-5 py-20 sm:px-8 sm:py-28'>
        <div
          className='label rule flex items-center justify-between gap-4 pt-4'
          data-reveal
        >
          <span>
            <span className='text-accent-text'>Sheet 07</span>
            <span className='mx-2 opacity-50'>/</span>
            Contact
          </span>
          <span className='inline-flex items-center gap-2'>
            <span className='dot' aria-hidden />
            Open to side projects
          </span>
        </div>

        <h2
          id='contact-heading'
          className='display mt-8 text-[clamp(3.5rem,13vw,13rem)]'
          data-reveal
        >
          Got a system
          <br />
          worth{' '}
          <span className='aside text-accent text-[1.06em]'>drawing up?</span>
        </h2>

        <div className='mt-12 grid gap-12 sm:mt-16 lg:grid-cols-12'>
          <div className='lg:col-span-5' data-reveal>
            <p className='text-muted text-lg leading-relaxed'>{contactNote}</p>
            <a
              href={x.url}
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-primary mt-8'
            >
              Message me on X
              <ArrowUpRight className='size-3.5' aria-hidden />
            </a>
          </div>

          <ul
            className='border-border-strong border-t lg:col-span-6 lg:col-start-7'
            data-reveal
          >
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target='_blank'
                  rel='noopener noreferrer me'
                  className='group border-border hover:bg-foreground hover:text-background -mx-3 flex items-center gap-4 border-b px-3 py-5 transition-colors duration-200'
                >
                  <s.icon className='size-5 shrink-0' />
                  <span className='display text-4xl sm:text-5xl'>{s.name}</span>
                  <span className='ml-auto font-mono text-xs opacity-70 sm:text-sm'>
                    {s.handle}
                  </span>
                  <ArrowUpRight
                    className='size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1'
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
