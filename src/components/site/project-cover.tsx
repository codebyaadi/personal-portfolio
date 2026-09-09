import type { CSSProperties } from 'react';
import { cssVars } from '@/lib/utils';

/**
 * Designed cover for projects without a screenshot — a tinted field, a fine
 * grid and the project wordmark. Keeps the projects section visually
 * consistent without inventing UI that doesn't exist.
 */
export function ProjectCover({
  name,
  category,
  index,
}: {
  name: string;
  category: string;
  index: number;
}) {
  const hue = (index * 47) % 360;

  return (
    <div
      className='bg-surface-2 relative flex size-full items-center justify-center overflow-hidden'
      style={cssVars({ '--h': `${hue}` })}
    >
      <div
        className='absolute inset-0 opacity-70'
        style={
          {
            background:
              'radial-gradient(120% 120% at 15% 0%, hsl(var(--h) 55% 22% / 0.55), transparent 60%), radial-gradient(120% 120% at 100% 100%, var(--accent-glow), transparent 55%)',
          } as CSSProperties
        }
      />
      <div className='grid-bg absolute inset-0 opacity-60' />

      <span className='text-faint absolute top-4 left-5 font-mono text-[11px] tracking-widest uppercase'>
        {category}
      </span>

      <span className='font-display text-foreground/90 relative px-6 text-center text-4xl font-semibold tracking-tight sm:text-6xl'>
        {name}
      </span>

      <span className='text-faint absolute right-5 bottom-4 font-mono text-[11px]'>
        ↗ github
      </span>
    </div>
  );
}
