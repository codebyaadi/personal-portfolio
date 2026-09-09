'use client';

import { useEffect, useRef } from 'react';

/**
 * Interactive dot-grid: points sit on a fixed lattice and are pushed away from
 * the pointer with a spring-back, brightening near the cursor. Dependency-free
 * canvas — DPR-capped, pauses off-screen / on hidden tab, and renders a single
 * static frame under `prefers-reduced-motion`.
 */
export function HeroGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const context = el.getContext('2d');
    if (!context) return;
    const canvas = el;
    const ctx = context;

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const GAP = 34;
    const RADIUS = 150;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    const pointer = { x: -9999, y: -9999 };

    type Dot = {
      ox: number;
      oy: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
    };
    let dots: Dot[] = [];

    const readAccent = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--accent')
        .trim();
    let accent = readAccent();

    function build() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP; y < h; y += GAP) {
        for (let x = GAP; x < w; x += GAP) {
          dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
        }
      }
      accent = readAccent();
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.x - pointer.x;
        const dy = d.y - pointer.y;
        const dist = Math.hypot(dx, dy);

        if (dist < RADIUS) {
          const force = (1 - dist / RADIUS) ** 2 * 5;
          d.vx += (dx / (dist || 1)) * force;
          d.vy += (dy / (dist || 1)) * force;
        }
        // spring home + damping
        d.vx += (d.ox - d.x) * 0.06;
        d.vy += (d.oy - d.y) * 0.06;
        d.vx *= 0.86;
        d.vy *= 0.86;
        d.x += d.vx;
        d.y += d.vy;

        const near = Math.max(0, 1 - dist / (RADIUS * 1.6));
        const size = 1 + near * 1.8;
        ctx.globalAlpha = 0.18 + near * 0.7;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function loop() {
      frame();
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (running || reduce) return;
      running = true;
      loop();
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    build();
    frame();

    const onResize = () => {
      build();
      frame();
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onVis = () => (document.hidden ? stop() : start());

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className='absolute inset-0 size-full [mask-image:radial-gradient(ellipse_75%_60%_at_50%_45%,black,transparent_85%)]'
    />
  );
}
