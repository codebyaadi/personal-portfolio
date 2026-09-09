import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

/**
 * Reveals text word-by-word with a masked upward slide. Pure CSS — the words
 * are always in the DOM and the animation fills to its final state, so the
 * heading stays legible even if the animation never runs (no JS, reduced
 * motion). Visual styling goes on `wordClassName` (each word is its own box);
 * `className` is for layout only.
 */
export function AnimatedWords({
  text,
  className,
  wordClassName,
  as: Tag = 'span',
  startDelay = 0,
  step = 90,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: 'h1' | 'h2' | 'p' | 'span';
  startDelay?: number;
  step?: number;
}) {
  const words = text.split(' ');
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className='inline-flex overflow-hidden pb-[0.14em] align-bottom'
        >
          <span
            className={cn('animate-word inline-block', wordClassName)}
            style={{ '--delay': `${startDelay + i * step}ms` } as CSSProperties}
          >
            {w}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}
