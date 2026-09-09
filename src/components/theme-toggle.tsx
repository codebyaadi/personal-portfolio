'use client';

import { MoonStar, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Zero-state theme toggle: the icon shown is driven purely by the `.light`
 * class via the Tailwind `light:` variant, so there's nothing to hydrate.
 * Clicking reads the current theme straight from the DOM and flips it.
 */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const isLight = document.documentElement.classList.toggle('light');
    try {
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    } catch {
      /* storage unavailable — session-only toggle */
    }
  }

  return (
    <button
      type='button'
      onClick={toggle}
      aria-label='Toggle color theme'
      className={cn(
        'border-border text-muted hover:border-border-strong hover:text-foreground inline-flex size-9 items-center justify-center rounded-full border transition-colors',
        className
      )}
    >
      <Sun className='light:hidden size-4' aria-hidden />
      <MoonStar className='light:block hidden size-4' aria-hidden />
    </button>
  );
}
