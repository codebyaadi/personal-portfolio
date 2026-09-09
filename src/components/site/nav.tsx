'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useActiveSection } from '@/hooks/use-active-section';
import { routeNav, sectionNav } from '@/constants';
import { cn } from '@/lib/utils';

const SECTION_IDS = sectionNav.map((item) => item.id);
/** "Home" is the wordmark's job — keep it in the menu, not the desktop pill. */
const DESKTOP_ITEMS = [
  ...sectionNav.filter((s) => s.id !== 'home'),
  ...routeNav,
];
const MOBILE_ITEMS = [...sectionNav, ...routeNav];

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeId = onHome
    ? activeSection
    : (routeNav.find((r) => r.href === pathname)?.id ?? '');

  const hrefFor = (href: string) =>
    href.startsWith('#') && !onHome ? `/${href}` : href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-border bg-background/70 border-b backdrop-blur-xl'
          : 'border-b border-transparent'
      )}
    >
      <div
        className='scroll-progress bg-accent absolute inset-x-0 bottom-0 h-px origin-left'
        aria-hidden
      />

      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8'>
        <Link
          href='/'
          onClick={() => setOpen(false)}
          className='font-display text-lg font-semibold tracking-tight'
        >
          aadi<span className='text-accent'>.</span>
        </Link>

        <nav
          aria-label='Primary'
          className='absolute left-1/2 hidden -translate-x-1/2 lg:block'
        >
          <ul className='border-border/70 bg-background/40 flex items-center rounded-full border p-1 backdrop-blur-xl'>
            {DESKTOP_ITEMS.map((item) => {
              const current = activeId === item.id;
              const isSection = item.href.startsWith('#');
              const cls =
                'relative block rounded-full px-3.5 py-1.5 text-[13px] transition-colors';
              const body = (
                <>
                  {current ? (
                    <motion.span
                      layoutId='nav-active'
                      className='bg-surface-2 absolute inset-0 rounded-full'
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  ) : null}
                  <span
                    className={cn(
                      'relative',
                      current
                        ? 'text-foreground'
                        : 'text-muted hover:text-foreground transition-colors'
                    )}
                  >
                    {item.label}
                  </span>
                </>
              );
              return (
                <li key={item.id}>
                  {isSection ? (
                    <a href={hrefFor(item.href)} className={cls}>
                      {body}
                    </a>
                  ) : (
                    <Link href={item.href} className={cls}>
                      {body}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className='flex items-center gap-1.5'>
          <ThemeToggle />
          <button
            type='button'
            className='border-border text-foreground inline-flex size-9 items-center justify-center rounded-full border lg:hidden'
            aria-expanded={open}
            aria-controls='mobile-menu'
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className='size-4' /> : <Menu className='size-4' />}
          </button>
        </div>
      </div>

      <div
        id='mobile-menu'
        ref={panelRef}
        hidden={!open}
        className='bg-background/95 fixed inset-0 top-16 z-40 backdrop-blur-xl lg:hidden'
      >
        <ul className='flex flex-col px-6 py-4'>
          {MOBILE_ITEMS.map((item, i) => {
            const current = activeId === item.id;
            const isSection = item.href.startsWith('#');
            const cls = cn(
              'flex items-baseline gap-4 border-b border-border py-4 font-display text-2xl transition-colors',
              current ? 'text-accent' : 'text-foreground hover:text-accent'
            );
            const body = (
              <>
                <span className='text-faint font-mono text-xs'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.label}
              </>
            );
            return (
              <li key={item.id}>
                {isSection ? (
                  <a
                    href={hrefFor(item.href)}
                    onClick={() => setOpen(false)}
                    className={cls}
                  >
                    {body}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cls}
                  >
                    {body}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
