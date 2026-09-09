'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';

const noop = () => () => {};

/**
 * On for fine pointers only. Reduced-motion visitors still get the cursor, but
 * the CSS drops the trailing lag and size transitions (see `.cursor-*` rules),
 * so it snaps 1:1 with no motion.
 */
function useCursorEnabled() {
  return useSyncExternalStore(
    noop,
    () => window.matchMedia('(pointer: fine)').matches,
    () => false
  );
}

/**
 * Custom pointer, driven straight from `pointermove` (no React state per frame,
 * no animation library). A dot tracks exactly; a ring trails via a CSS
 * transition, so it always catches up. The ring grows over interactive
 * elements and, over anything tagged `data-cursor`, fills and shows a label.
 * Uses `mix-blend-mode: difference` so it reads on any background without
 * hiding content. Never mounts for touch devices or reduced-motion visitors.
 */
export function Cursor() {
  const enabled = useCursorEnabled();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const labelEl = labelRef.current;
    if (!dot || !ring || !labelEl) return;

    document.body.classList.add('has-cursor');
    let shown = false;

    const move = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      ring.style.transform = `translate(${x}px, ${y}px)`;

      if (!shown) {
        shown = true;
        dot.style.opacity = ring.style.opacity = '1';
      }

      const target = e.target as HTMLElement;
      const tagged = target.closest?.('[data-cursor]') as HTMLElement | null;
      const interactive = target.closest?.(
        'a, button, [role="button"], label, input, textarea, select'
      );
      const mode = tagged ? 'view' : interactive ? 'link' : 'idle';
      if (ring.dataset.mode !== mode) {
        ring.dataset.mode = mode;
        labelEl.textContent = tagged?.dataset.cursor || 'View';
      }
    };

    const hide = () => {
      shown = false;
      dot.style.opacity = ring.style.opacity = '0';
    };
    const down = () => (ring.dataset.down = 'true');
    const up = () => delete ring.dataset.down;

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      document.body.classList.remove('has-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className='cursor-layer'>
      <div ref={ringRef} className='cursor-ring' data-mode='idle'>
        <span ref={labelRef} className='cursor-label' />
      </div>
      <div ref={dotRef} className='cursor-dot' />
    </div>
  );
}
