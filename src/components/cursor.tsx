'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const noop = () => () => {};

/** True only on fine pointers without a reduced-motion preference. */
function useCursorEnabled() {
  return useSyncExternalStore(
    noop,
    () =>
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  );
}

/**
 * Custom pointer: an exact-tracking dot plus a springy trailing ring that
 * expands over interactive elements. The native cursor is left untouched for
 * touch devices and reduced-motion visitors.
 */
export function Cursor() {
  const enabled = useCursorEnabled();
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add('has-cursor');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const el = e.target as HTMLElement;
      setActive(
        Boolean(
          el.closest(
            'a, button, [role="button"], [data-cursor], input, textarea, select'
          )
        )
      );
    };
    const leave = () => setHidden(true);

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      document.body.classList.remove('has-cursor');
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className='pointer-events-none fixed inset-0 z-[70] hidden md:block'
      style={{ opacity: hidden ? 0 : 1, transition: 'opacity 0.2s' }}
    >
      <motion.div
        className='bg-accent absolute -mt-1 -ml-1 size-2 rounded-full'
        style={{ x, y }}
      />
      <motion.div
        className='border-accent/60 absolute rounded-full border'
        style={{
          x: ringX,
          y: ringY,
          width: active ? 52 : 30,
          height: active ? 52 : 30,
          marginLeft: active ? -26 : -15,
          marginTop: active ? -26 : -15,
          backgroundColor: active
            ? 'color-mix(in oklch, var(--accent) 12%, transparent)'
            : 'transparent',
          transition:
            'width .25s cubic-bezier(.16,1,.3,1), height .25s cubic-bezier(.16,1,.3,1), margin .25s cubic-bezier(.16,1,.3,1), background-color .25s',
        }}
      />
    </div>
  );
}
