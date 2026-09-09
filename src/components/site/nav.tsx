'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useActiveSection } from '@/hooks/use-active-section';
import { routeNav, sectionNav } from '@/constants';
import { cn } from '@/lib/utils';

const SECTION_IDS = sectionNav.map((item) => item.id);

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
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
          ? 'border-border bg-background/75 border-b backdrop-blur-xl'
          : 'border-b border-transparent'
      )}
    >
      <div
        className='scroll-progress bg-accent absolute inset-x-0 bottom-0 h-px origin-left'
        aria-hidden
      />
      <nav
        aria-label='Primary'
        className='mx-auto flex h-16 max-w-6xl items-center justify-between px-6'
      >
        <a
          href='#home'
          className='font-display text-lg font-semibold tracking-tight'
        >
          aadi<span className='text-accent'>.</span>
        </a>

        <ul className='border-border bg-background/60 hidden items-center gap-0.5 rounded-full border p-1 backdrop-blur-xl md:flex'>
          {sectionNav.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={active === item.id ? 'true' : undefined}
                className={cn(
                  'block rounded-full px-3.5 py-1.5 text-sm transition-colors',
                  active === item.id
                    ? 'bg-surface-2 text-foreground'
                    : 'text-muted hover:text-foreground'
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
          {routeNav.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className='text-muted hover:text-foreground block rounded-full px-3.5 py-1.5 text-sm transition-colors'
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-2'>
          <ThemeToggle className='hidden sm:inline-flex' />
          <button
            type='button'
            className='border-border text-foreground inline-flex size-9 items-center justify-center rounded-full border md:hidden'
            aria-expanded={open}
            aria-controls='mobile-menu'
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className='size-4' /> : <Menu className='size-4' />}
          </button>
        </div>
      </nav>

      <div
        id='mobile-menu'
        ref={panelRef}
        hidden={!open}
        className='bg-background/95 fixed inset-0 top-16 z-40 backdrop-blur-xl md:hidden'
      >
        <ul className='flex flex-col px-6 py-6'>
          {[...sectionNav, ...routeNav].map((item, i) => {
            const isSection = item.href.startsWith('#');
            const current = isSection && active === item.id;
            const inner = (
              <>
                <span className='text-faint font-mono text-xs'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.label}
              </>
            );
            const className = cn(
              'flex items-baseline gap-4 border-b border-border py-4 font-display text-2xl transition-colors',
              current ? 'text-accent' : 'text-foreground hover:text-accent'
            );
            return (
              <li key={item.id}>
                {isSection ? (
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={current ? 'true' : undefined}
                    className={className}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={className}
                  >
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div className='px-6'>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
