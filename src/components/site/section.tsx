import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  index: string;
  /** A single line, or two stacked lines — the second renders muted/outlined. */
  title: string | [string, string];
  kicker?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Section shell: a small mono index, then a heavy all-caps display heading —
 * one solid line, optionally a second muted/outlined line beneath it — plus
 * an optional kicker and a hairline rule. The heading labels the region for
 * assistive tech.
 */
export function Section({
  id,
  index,
  title,
  kicker,
  children,
  className,
}: SectionProps) {
  const [main, accent] = Array.isArray(title) ? title : [title, undefined];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('scroll-mt-20 py-20 sm:py-28', className)}
    >
      <div className='mx-auto max-w-6xl px-6'>
        <div
          className='border-border mb-12 flex flex-col gap-6 border-b pb-7 sm:mb-16 sm:flex-row sm:items-end sm:justify-between'
          data-reveal
        >
          <div>
            <span className='text-faint font-mono text-xs tracking-widest uppercase'>
              {index}
            </span>
            <h2
              id={`${id}-heading`}
              className='mt-2 text-5xl leading-[0.92] font-extrabold tracking-tight uppercase sm:text-7xl'
            >
              <span className='block'>{main}</span>
              {accent ? (
                <span className='text-faint block'>{accent}</span>
              ) : null}
            </h2>
          </div>
          {kicker ? (
            <p className='text-faint max-w-xs font-mono text-xs leading-relaxed sm:text-right'>
              {kicker}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
