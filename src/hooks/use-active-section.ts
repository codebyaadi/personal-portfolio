'use client';

import { useEffect, useState } from 'react';

/**
 * Scroll-spy for in-page nav. Picks the last section whose top has crossed a
 * line ~35% down the viewport, and snaps to the final section once the page is
 * scrolled to the bottom. Plain scroll math — no gaps between sections, and no
 * dependence on IntersectionObserver or rAF timing.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const update = () => {
      const line = Math.max(96, window.innerHeight * 0.3);
      let currentId = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) currentId = el.id;
      }
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      ) {
        currentId = els[els.length - 1].id;
      }
      setActive((prev) => (prev === currentId ? prev : currentId));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ids]);

  return active;
}
