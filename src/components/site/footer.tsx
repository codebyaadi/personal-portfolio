import Link from 'next/link';
import { personal, routeNav, sectionNav } from '@/constants';
import { LocalClock } from './local-clock';

export function Footer() {
  return (
    <footer className='border-border-strong overflow-hidden border-t'>
      <div className='mx-auto max-w-[86rem] px-5 pt-10 sm:px-8'>
        <div className='label flex flex-wrap items-center justify-between gap-x-8 gap-y-4'>
          <span className='inline-flex items-center gap-2'>
            <span className='dot' aria-hidden />
            <span className='text-foreground'>End of drawing set</span>
          </span>
          <nav aria-label='Footer' className='flex flex-wrap gap-x-6 gap-y-2'>
            {[...sectionNav, ...routeNav].map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className='hover:text-foreground transition-colors'
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LocalClock />
        </div>
      </div>

      {/* Oversized wordmark, cropped by the bottom edge of the page. */}
      <p
        className='display outline-text hover:text-accent mt-8 -mb-[0.1em] text-center text-[21vw] leading-[0.9] whitespace-nowrap transition-colors duration-500 select-none'
        aria-hidden
      >
        codebyaadi
      </p>

      <div className='bg-background border-border relative border-t'>
        <div className='label mx-auto flex max-w-[86rem] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-5 py-4 sm:px-8'>
          <span>
            © {new Date().getFullYear()} {personal.name}
          </span>
          <span>Drawn by hand in Next.js &amp; Tailwind</span>
          <Link
            href='/#home'
            className='hover:text-foreground transition-colors'
          >
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
