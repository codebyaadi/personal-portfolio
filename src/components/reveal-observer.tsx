'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Minimal scroll reveal: adds `.is-visible` to `[data-reveal]` elements as
 * they enter the viewport — a short fade + small rise, nothing choreographed
 * per-word. Re-scans on route change so the /blog page gets it too.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)')
    );
    if (targets.length === 0) return;

    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
