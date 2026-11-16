'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { routeNav, sectionNav } from '@/constants';
import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';
import { openPalette } from './command-palette';

/**
 * Fixed top bar: the drawing set's running header. It names the sheet you
 * are on, and its bottom edge fills as you scroll. On small screens the
 * links collapse into the command palette, which doubles as the menu.
 */
export function Nav() {
  const pathname = usePathname();
  const ids = useMemo(() => sectionNav.map((s) => s.id), []);
  const active = useActiveSection(ids);
  const onHome = pathname === '/';
  const links = sectionNav.filter((s) => s.id !== 'home' && s.id !== 'faq');
  const sheet = sectionNav.findIndex((s) => s.id === active);

  return (
    <header className='border-border-strong bg-background/85 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md'>
      <div className='mx-auto flex h-14 max-w-[90rem] items-center gap-4 px-5 sm:px-8'>
        <Link
          href='/#home'
          className='aside text-2xl leading-none'
          aria-label='Aditya Rajbhar — home'
        >
          aadi<span className='text-accent'>.</span>
        </Link>

        {onHome && sheet >= 0 ? (
          <span className='label border-border-strong hidden items-center gap-2 border-l pl-4 md:inline-flex'>
            <span className='text-accent-text tabular-nums'>
              Sheet {String(sheet + 1).padStart(2, '0')}
              <span className='opacity-60'>
                {' '}
                / {String(sectionNav.length).padStart(2, '0')}
              </span>
            </span>
            <span className='text-foreground'>{sectionNav[sheet].label}</span>
          </span>
        ) : null}

        <nav
          aria-label='Primary'
          className='ml-auto hidden items-center gap-6 lg:flex'
        >
          {links.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={onHome && active === item.id ? 'true' : undefined}
              className={cn(
                'label link-underline pb-0.5 transition-colors',
                onHome && active === item.id
                  ? 'link-underline-active text-foreground'
                  : 'hover:text-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
          {routeNav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'label link-underline pb-0.5 transition-colors',
                pathname.startsWith(item.href)
                  ? 'link-underline-active text-foreground'
                  : 'hover:text-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='ml-auto flex items-center gap-2 lg:ml-2'>
          <button
            type='button'
            onClick={openPalette}
            aria-label='Open command menu'
            className='label border-border-strong hover:bg-foreground hover:text-background inline-flex h-9 items-center gap-2 border px-3 transition-colors'
          >
            <span className='lg:hidden'>Menu</span>
            <span className='hidden lg:inline'>Jump to</span>
            <kbd className='hidden font-mono text-[0.625rem] tracking-normal opacity-70 sm:inline'>
              Ctrl K
            </kbd>
          </button>
          <ThemeToggle className='border-border-strong hover:bg-foreground hover:text-background rounded-none' />
        </div>
      </div>
      <div
        className='scroll-progress bg-accent absolute inset-x-0 -bottom-px h-[2px]'
        aria-hidden
      />
    </header>
  );
}
