'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** After this long without pointer input the lens wanders on its own. */
const IDLE_MS = 2600;

/**
 * Drives the hero's X-ray lens. Children render twice in the hero — the
 * surface sheet and, masked to a circle, the sheet underneath — and this
 * component only moves three CSS variables (`--mx`, `--my`, `--r`) that the
 * mask and the ring read. The lens eases toward the pointer, widens while
 * pressed, and drifts on a slow Lissajous path when nobody is steering
 * (which is also how touch devices see it).
 */
export function HeroLens({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let w = el.clientWidth;
    let h = el.clientHeight;
    const base = () => Math.max(84, Math.min(w * 0.13, 190));

    const cur = { x: w * 0.7, y: h * 0.36, r: 0 };
    const target = { x: cur.x, y: cur.y, r: base() };

    const paint = () => {
      el.style.setProperty('--mx', `${cur.x.toFixed(1)}px`);
      el.style.setProperty('--my', `${cur.y.toFixed(1)}px`);
      el.style.setProperty('--r', `${cur.r.toFixed(1)}px`);
      if (readout.current) {
        const pad = (n: number) => String(Math.round(n)).padStart(4, '0');
        readout.current.textContent = `X ${pad(cur.x)} · Y ${pad(cur.y)}`;
      }
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cur.r = base();
      paint();
      return;
    }

    let lastInput = -Infinity;
    let pressed = false;
    let visible = true;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      lastInput = performance.now();
    };
    const onDown = (e: PointerEvent) => {
      onMove(e);
      pressed = e.pointerType === 'mouse';
    };
    const onUp = () => {
      pressed = false;
    };
    const onResize = () => {
      w = el.clientWidth;
      h = el.clientHeight;
    };

    const tick = (t: number) => {
      const idle = t - lastInput > IDLE_MS;
      if (idle) {
        const s = t / 1000;
        target.x = w * (0.5 + 0.36 * Math.sin(s * 0.42));
        target.y = h * (0.4 + 0.2 * Math.sin(s * 0.67 + 1.3));
      }
      target.r = pressed ? base() * 1.9 : base();
      const k = idle ? 0.045 : 0.16;
      cur.x += (target.x - cur.x) * k;
      cur.y += (target.y - cur.y) * k;
      cur.r += (target.r - cur.r) * 0.1;
      paint();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(el);

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    window.addEventListener('resize', onResize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div ref={ref} className='hero relative isolate overflow-hidden'>
      {children}
      <div className='lens-ring' aria-hidden>
        <span ref={readout} className='lens-readout'>
          X 0000 · Y 0000
        </span>
      </div>
    </div>
  );
}
