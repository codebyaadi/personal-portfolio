import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts an ISO 8601 date string into a human-readable format.
 *
 * @param isoDate - The ISO 8601 date string (e.g., "2024-02-23T01:00:09.122Z").
 * @param options - Optional parameters for locale and formatting.
 * @returns A formatted date string.
 */
export function formatDate(
  isoDate: string,
  options?: {
    locale?: string;
    includeTime?: boolean;
  }
): string {
  const { locale = 'en-US', includeTime = false } = options || {};
  const date = new Date(isoDate);

  const dateOptions: Intl.DateTimeFormatOptions = includeTime
    ? {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      }
    : {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

  return date.toLocaleString(locale, dateOptions);
}
