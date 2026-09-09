import { cssVars } from '@/lib/utils';

const ITEMS = [
  'Full-Stack Development',
  'Distributed Systems',
  'TypeScript',
  'Next.js',
  'Go',
  'NestJS',
  'AI-Assisted Products',
  'Web Performance',
  'Developer Experience',
  'Open Source',
];

/**
 * Decorative infinite marquee. Content is duplicated so the CSS animation can
 * translate -50% seamlessly; pauses on hover and under reduced motion.
 */
export function Marquee() {
  return (
    <div
      className='group/marquee border-border relative flex overflow-hidden border-y py-5 select-none'
      style={cssVars({ '--marquee-duration': '36s' })}
      aria-hidden
    >
      <div className='marquee-track flex shrink-0 items-center gap-8 pr-8'>
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className='flex items-center gap-8'>
            <span className='font-display text-faint text-lg font-medium tracking-tight sm:text-2xl'>
              {item}
            </span>
            <span className='text-accent'>✦</span>
          </span>
        ))}
      </div>
      <div className='from-background pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r to-transparent' />
      <div className='from-background pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l to-transparent' />
    </div>
  );
}
