import { YoutubeIcon } from '@/components/icons';
import { Magnetic } from '@/components/ui/magnetic';
import { youtube } from '@/constants';

/**
 * A standalone promo band, not a numbered `Section` — same pattern as
 * `Marquee`, sitting between Experience and FAQ.
 */
export function Shorts() {
  return (
    <section aria-labelledby='shorts-heading' className='py-20 sm:py-28'>
      <div className='mx-auto max-w-6xl px-6'>
        <div
          className='border-border bg-surface/40 relative overflow-hidden rounded-3xl border px-8 py-14 text-center sm:px-16 sm:py-20'
          data-reveal
        >
          <div className='grid-bg pointer-events-none absolute inset-0 opacity-60' />
          <div className='pointer-events-none absolute top-1/2 left-1/2 h-[26rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_70%)] blur-3xl' />

          <div className='relative'>
            <p className='text-faint font-mono text-xs tracking-[0.18em] uppercase'>
              On YouTube
            </p>
            <h2
              id='shorts-heading'
              className='mx-auto mt-4 text-4xl leading-[0.95] font-extrabold tracking-tight uppercase sm:text-6xl'
            >
              <span className='block'>New Shorts</span>
              <span className='text-faint block'>every week</span>
            </h2>
            <p className='text-muted mx-auto mt-5 max-w-lg leading-relaxed'>
              {youtube.line}
            </p>

            <div className='mt-9 flex justify-center'>
              <Magnetic strength={0.35}>
                <a
                  href={youtube.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group bg-accent text-accent-contrast hover:bg-accent-strong inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium transition-colors'
                >
                  <YoutubeIcon className='size-4' />
                  Watch on YouTube
                  <span className='transition-transform duration-300 group-hover:translate-x-1'>
                    →
                  </span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
