export interface Stat {
  value: string;
  label: string;
}

/**
 * Honest, hand-checked numbers for the hero — not auto-derived, so update
 * them deliberately when they go stale. Last checked: Oct 2026.
 */
export const stats: Stat[] = [
  { value: '2+', label: 'Years, professional' },
  { value: '10+', label: 'Things shipped' },
  { value: '7', label: 'Languages' },
];
