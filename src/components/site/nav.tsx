'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

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

  // Position the sliding indicator under the active desktop item.
  useLayoutEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-id="${activeId}"]`);
    if (!list || !el) {
      setPill(null);
      return;
    }
    setPill({ x: el.offsetLeft, w: el.offsetWidth });
  }, [activeId, pathname]);

  useEffect(() => {
    const onResize = () => {
      const list = listRef.current;
      const el = list?.querySelector<HTMLElement>(`[data-id="${activeId}"]`);
      if (list && el) setPill({ x: el.offsetLeft, w: el.offsetWidth });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeId]);

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
          <ul
            ref={listRef}
            className='border-border/70 bg-background/40 relative flex items-center rounded-full border p-1 backdrop-blur-xl'
          >
            <span
              aria-hidden
              className={cn(
                'bg-surface-2 absolute top-1 bottom-1 left-0 rounded-full transition-[transform,width,opacity] duration-300 ease-out',
                pill ? 'opacity-100' : 'opacity-0'
              )}
              style={{
                transform: `translateX(${pill?.x ?? 0}px)`,
                width: pill?.w ?? 0,
              }}
            />
            {DESKTOP_ITEMS.map((item) => {
              const current = activeId === item.id;
              const isSection = item.href.startsWith('#');
              const cls = cn(
                'relative z-10 block rounded-full px-3.5 py-1.5 text-[13px] transition-colors',
                current ? 'text-foreground' : 'text-muted hover:text-foreground'
              );
              return (
                <li key={item.id}>
                  {isSection ? (
                    <a
                      href={hrefFor(item.href)}
                      data-id={item.id}
                      aria-current={current ? 'true' : undefined}
                      className={cls}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      data-id={item.id}
                      aria-current={current ? 'page' : undefined}
                      className={cls}
                    >
                      {item.label}
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
