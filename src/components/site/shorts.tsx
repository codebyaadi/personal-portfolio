import { ArrowUpRight } from 'lucide-react';
import { YoutubeIcon } from '@/components/icons';
import { youtube } from '@/constants';

/**
 * A full-bleed vermilion band between the stack and the notes — the one
 * place the second ink is allowed to take over the whole sheet.
 */
export function Shorts() {
  return (
    <section
      aria-labelledby='shorts-heading'
      className='bg-accent text-accent-contrast relative overflow-hidden'
    >
      <div className='mx-auto grid max-w-[86rem] items-end gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12'>
        <div className='lg:col-span-8' data-reveal>
          <p className='inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase'>
            <span className='size-2 animate-pulse rounded-full bg-current' />
            Broadcast / YouTube {youtube.handle}
          </p>
          <h2
            id='shorts-heading'
            className='display mt-6 text-[clamp(3.25rem,10.5vw,9.5rem)]'
          >
            New shorts
            <br />
            <span className='aside text-[1.06em]'>every week.</span>
          </h2>
        </div>
        <div className='lg:col-span-4' data-reveal>
          <p className='max-w-sm text-lg leading-snug font-medium'>
            {youtube.line}
          </p>
          <a
            href={youtube.url}
            target='_blank'
            rel='noopener noreferrer'
            className='group bg-accent-contrast mt-7 inline-flex items-center gap-3 px-5 py-3.5 font-mono text-[0.78rem] font-semibold tracking-[0.08em] text-[#f4efe1] uppercase shadow-[5px_5px_0_0_rgb(9_18_89/0.35)] transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5'
          >
            <YoutubeIcon className='size-4' />
            Watch on YouTube
            <ArrowUpRight
              className='size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
              aria-hidden
            />
          </a>
        </div>
      </div>
    </section>
  );
}
