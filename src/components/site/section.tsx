import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  index: string;
  title: string;
  kicker?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Editorial section shell: oversized mono index, display heading, optional
 * kicker, hairline rule. The heading labels the region for assistive tech.
 */
export function Section({
  id,
  index,
  title,
  kicker,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('scroll-mt-24 py-24 sm:py-36', className)}
    >
      <div className='mx-auto max-w-6xl px-6'>
        <div
          className='border-border mb-14 flex flex-col gap-4 border-b pb-6 sm:mb-20 sm:flex-row sm:items-end sm:justify-between'
          data-reveal
        >
          <div className='flex items-start gap-4 sm:gap-6'>
            <span className='text-accent mt-1 font-mono text-sm tabular-nums'>
              {index}
            </span>
            <h2
              id={`${id}-heading`}
              className='text-3xl font-semibold tracking-tight sm:text-5xl'
            >
              {title}
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
