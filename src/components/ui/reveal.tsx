'use client';

import { useEffect, useRef, useState, type ElementType } from 'react';
import { cn } from '@/lib/utils';

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Reveals text word-by-word with a masked upward slide. The words are always
 * in the DOM (just visually masked) so the heading stays legible if JS or
 * the animation never runs.
 *
 * Two modes:
 * - `autoPlay`: plays once on mount (for content already in view, e.g. the
 *   hero name) with a fixed `startDelay`.
 * - default: a single `IntersectionObserver` triggers the reveal the first
 *   time the element scrolls into view, then disconnects — no scroll
 *   listener, no per-frame work.
 *
 * Respects `prefers-reduced-motion` (words render settled, no animation).
 */
export function AnimatedWords({
  text,
  className,
  wordClassName,
  as = 'span',
  autoPlay = false,
  startDelay = 0,
  step = 70,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: ElementType;
  autoPlay?: boolean;
  startDelay?: number;
  step?: number;
}) {
  const Tag = as;
  const ref = useRef<HTMLElement>(null);
  // Lazy init so reduced-motion visitors never see the masked state at all.
  const [play, setPlay] = useState(prefersReducedMotion);

  useEffect(() => {
    if (play) return;

    if (autoPlay) {
      const t = setTimeout(() => setPlay(true), 20);
      return () => clearTimeout(t);
    }

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setPlay(true);
          obs.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoPlay, play]);

  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className='inline-block overflow-hidden pb-[0.14em] align-bottom'
        >
          <span
            className={cn(
              'inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
              play ? 'translate-y-0' : 'translate-y-[110%]',
              wordClassName
            )}
            style={{ transitionDelay: `${startDelay + i * step}ms` }}
          >
            {w}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}
