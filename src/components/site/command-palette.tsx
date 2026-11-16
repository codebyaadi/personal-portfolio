'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { projects, routeNav, sectionNav, socials } from '@/constants';
import { cn } from '@/lib/utils';

const OPEN_EVENT = 'palette:open';

/** Lets any component (e.g. the nav button) open the palette. */
export function openPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

interface Command {
  group: string;
  label: string;
  hint?: string;
  run: () => void;
}

/**
 * Ctrl/⌘+K command menu — jump to a section, open a project or profile, or
 * flip the theme. Also serves as the mobile navigation.
 */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  const commands = useMemo<Command[]>(() => {
    const ext = (url: string) => () =>
      window.open(url, '_blank', 'noopener,noreferrer');
    return [
      ...sectionNav.map((s) => ({
        group: 'Go to',
        label: s.label,
        hint: s.href.replace('/', ''),
        run: () => router.push(s.href),
      })),
      ...routeNav.map((r) => ({
        group: 'Go to',
        label: r.label,
        hint: r.href,
        run: () => router.push(r.href),
      })),
      ...projects.map((p) => ({
        group: 'Open system',
        label: p.name,
        hint: p.category,
        run: ext(p.links[0].href),
      })),
      ...socials.map((s) => ({
        group: 'Reach me',
        label: s.name,
        hint: s.handle,
        run: ext(s.url),
      })),
      {
        group: 'System',
        label: 'Switch blueprint / paper',
        hint: 'theme',
        run: () => {
          const isLight = document.documentElement.classList.toggle('light');
          try {
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
          } catch {
            /* storage unavailable */
          }
        },
      },
    ];
  }, [router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.group} ${c.label} ${c.hint ?? ''}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    const show = () => {
      lastFocus.current = document.activeElement as HTMLElement | null;
      setQuery('');
      setCursor(0);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const restore = lastFocus.current;
    return () => {
      document.body.style.overflow = prev;
      // Hand focus back to whatever opened the menu.
      restore?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  if (!open) return null;

  const execute = (cmd: Command | undefined) => {
    if (!cmd) return;
    close();
    cmd.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) =>
        results.length ? (c - 1 + results.length) % results.length : 0
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      execute(results[cursor]);
    }
  };

  return (
    <div
      className='fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]'
      onKeyDown={onKeyDown}
    >
      <button
        type='button'
        aria-label='Close command menu'
        tabIndex={-1}
        onClick={close}
        className='bg-bg-elevated/80 absolute inset-0 cursor-default backdrop-blur-sm'
      />
      <div
        role='dialog'
        aria-modal='true'
        aria-label='Command menu'
        className='animate-fade-rise border-border-strong bg-background relative w-full max-w-xl overflow-hidden border shadow-[10px_10px_0_0_var(--accent)] [animation-duration:0.25s]'
      >
        <div className='border-border flex items-center gap-3 border-b px-4'>
          <span className='text-accent font-mono text-sm' aria-hidden>
            ❯
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            placeholder='Where to? Try “upzy” or “contact”'
            aria-label='Search commands'
            className='placeholder:text-faint h-13 w-full bg-transparent font-mono text-sm outline-none'
          />
          <kbd className='label border-border border px-1.5 py-0.5'>
            Esc
          </kbd>
        </div>

        <ul
          ref={listRef}
          className='max-h-[min(24rem,55vh)] overflow-y-auto p-2'
        >
          {results.length === 0 ? (
            <li className='label px-3 py-6 text-center'>Not on this sheet</li>
          ) : (
            results.map((cmd, i) => {
              const firstOfGroup =
                i === 0 || results[i - 1].group !== cmd.group;
              return (
                <li key={`${cmd.group}-${cmd.label}`}>
                  {firstOfGroup ? (
                    <p className='label px-3 pt-3 pb-1.5'>{cmd.group}</p>
                  ) : null}
                  <button
                    type='button'
                    data-active={i === cursor}
                    onMouseEnter={() => setCursor(i)}
                    onClick={() => execute(cmd)}
                    className={cn(
                      'flex w-full items-center justify-between gap-4 px-3 py-2.5 text-left text-sm transition-colors',
                      i === cursor
                        ? 'bg-accent text-accent-contrast'
                        : 'text-muted'
                    )}
                  >
                    <span className='font-medium'>{cmd.label}</span>
                    {cmd.hint ? (
                      <span className='font-mono text-xs opacity-70'>
                        {cmd.hint}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })
          )}
        </ul>

        <div className='label border-border flex items-center justify-between border-t px-4 py-2.5'>
          <span>↑↓ navigate · ↵ open</span>
          <span>codebyaadi</span>
        </div>
      </div>
    </div>
  );
}
