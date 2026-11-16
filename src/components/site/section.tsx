import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * One sheet of the drawing set. A ruled header strip — `SHEET 02 / SYSTEMS`
 * on the left, a drafting note on the right — then a loud serif heading.
 * `invert` prints the sheet in the opposite ink, so sections alternate
 * between blueprint and paper.
 */
export function Section({
  id,
  index,
  label,
  meta,
  heading,
  children,
  invert = false,
  className,
}: {
  id: string;
  index: string;
  label: string;
  meta?: ReactNode;
  heading: ReactNode;
  children: ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('relative', invert && 'sheet-alt', className)}
    >
      <div className='mx-auto max-w-[86rem] px-5 py-20 sm:px-8 sm:py-28'>
        <div
          className='label rule flex items-center justify-between gap-4 pt-4'
          data-reveal
        >
          <span>
            <span className='text-accent-text'>Sheet {index}</span>
            <span className='mx-2 opacity-50'>/</span>
            {label}
          </span>
          {meta ? <span className='text-right'>{meta}</span> : null}
        </div>
        <h2
          id={`${id}-heading`}
          className='display mt-8 text-[clamp(3rem,9vw,8.5rem)]'
          data-reveal
        >
          {heading}
        </h2>
        <div className='mt-12 sm:mt-16'>{children}</div>
      </div>
    </section>
  );
}
