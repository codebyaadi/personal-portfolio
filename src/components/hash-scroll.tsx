'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Height reserved for the fixed header when landing on an anchor. */
const HEADER_OFFSET = 80;

/**
 * Re-aligns to the URL hash after the page has settled. When arriving at
 * `/#projects` from another route, the browser's initial scroll can land in the
 * wrong place because sections above are still growing (fonts, lazy media).
 * This snaps it back to the target, instantly, once layout is stable.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    const align = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const top =
        el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: 'instant' });
    };

    const t1 = setTimeout(align, 50);
    const t2 = setTimeout(align, 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}
