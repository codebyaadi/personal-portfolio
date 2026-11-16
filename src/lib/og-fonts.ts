import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Fonts for the generated images (OG card, icons). next/og needs raw
 * TTF/OTF data, so the site's faces are fetched from Google Fonts — the
 * same source next/font uses at build time — as static instances. If that
 * fetch fails, everything falls back to the bundled Sora, so image
 * generation never breaks the build.
 */

type Weight = 300 | 400 | 500 | 600 | 700 | 800;

export interface OgFont {
  name: string;
  data: ArrayBuffer | Buffer;
  weight: Weight;
  style: 'normal' | 'italic';
}

async function google(query: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${query}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

const sora = () =>
  readFile(path.join(process.cwd(), 'src', 'app', 'fonts', 'Sora-Regular.ttf'));

/** Font stacks to use in image markup; Sora catches any failed fetch. */
export const ogFamily = {
  display: 'Fraunces, Sora',
  mono: 'Geist Mono, Sora',
  sans: 'Sora',
};

export async function loadOgFonts({
  mono = true,
}: { mono?: boolean } = {}): Promise<OgFont[]> {
  const [fallback, roman, italic, geistMono] = await Promise.all([
    sora(),
    google('Fraunces:ital,opsz,wght,SOFT,WONK@0,144,400,0,1'),
    google('Fraunces:ital,opsz,wght,SOFT,WONK@1,144,400,100,1'),
    mono ? google('Geist+Mono:wght@500') : null,
  ]);

  const fonts: OgFont[] = [
    { name: 'Sora', data: fallback, weight: 400, style: 'normal' },
  ];
  if (roman)
    fonts.push({ name: 'Fraunces', data: roman, weight: 400, style: 'normal' });
  if (italic)
    fonts.push({
      name: 'Fraunces',
      data: italic,
      weight: 400,
      style: 'italic',
    });
  if (geistMono)
    fonts.push({
      name: 'Geist Mono',
      data: geistMono,
      weight: 500,
      style: 'normal',
    });
  return fonts;
}
