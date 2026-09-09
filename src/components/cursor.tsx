'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'motion/react';

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

type Mode = 'idle' | 'link' | 'view';

/**
 * Custom pointer: a small exact-tracking dot and a springy trailing ring that
 * reacts to context — it grows over interactive elements, and over anything
 * tagged `data-cursor` it becomes a filled disc with a label ("View"). Blends
 * with `mix-blend-mode: difference` so it stays visible on any background.
 * Never mounts for touch devices or reduced-motion visitors.
 */
export function Cursor() {
  const enabled = useCursorEnabled();
  const [mode, setMode] = useState<Mode>('idle');
  const [label, setLabel] = useState('');
  const [down, setDown] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.55 });

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add('has-cursor');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);

      const el = e.target as HTMLElement;
      const tagged = el.closest<HTMLElement>('[data-cursor]');
      if (tagged) {
        setMode('view');
        setLabel(tagged.dataset.cursor || 'View');
      } else if (
        el.closest('a, button, [role="button"], input, textarea, select')
      ) {
        setMode('link');
        setLabel('');
      } else {
        setMode('idle');
        setLabel('');
      }
    };
    const leave = () => setHidden(true);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', leave);
      document.body.classList.remove('has-cursor');
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ring =
    mode === 'view'
      ? { size: 72, bg: 'var(--accent)', border: 'transparent', blend: false }
      : mode === 'link'
        ? {
            size: 52,
            bg: 'color-mix(in oklch, white 100%, transparent)',
            border: 'transparent',
            blend: true,
          }
        : { size: 26, bg: 'transparent', border: 'white', blend: true };

  return (
    <div
      aria-hidden
      className='pointer-events-none fixed inset-0 z-[80] hidden md:block'
      style={{ opacity: hidden ? 0 : 1, transition: 'opacity 0.25s' }}
    >
      <motion.div
        className='absolute rounded-full'
        style={{
          x: ringX,
          y: ringY,
          width: ring.size,
          height: ring.size,
          marginLeft: -ring.size / 2,
          marginTop: -ring.size / 2,
          backgroundColor: ring.bg,
          border: `1px solid ${ring.border}`,
          mixBlendMode: ring.blend ? 'difference' : 'normal',
          scale: down ? 0.85 : 1,
          transition:
            'width .28s cubic-bezier(.16,1,.3,1), height .28s cubic-bezier(.16,1,.3,1), margin .28s cubic-bezier(.16,1,.3,1), background-color .28s, scale .15s',
        }}
      >
        <AnimatePresence>
          {mode === 'view' && label ? (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className='text-accent-contrast absolute inset-0 flex items-center justify-center text-[10px] font-medium tracking-wider uppercase'
            >
              {label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className='bg-accent absolute size-1.5 rounded-full'
        style={{
          x,
          y,
          marginLeft: -3,
          marginTop: -3,
          opacity: mode === 'view' ? 0 : 1,
        }}
      />
    </div>
  );
}
