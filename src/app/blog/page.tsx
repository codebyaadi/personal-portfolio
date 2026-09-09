import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Footer } from '@/components/site/footer';
import { type BlogPost, getBlogPosts } from '@/constants/blog';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes on software development, the web platform, and building things — by Aditya Rajbhar.',
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts: BlogPost[] = await getBlogPosts();

  return (
    <>
      <div className='mx-auto max-w-3xl px-6 pt-32 pb-20'>
        <Link
          href='/'
          className='text-faint hover:text-foreground inline-flex items-center gap-1.5 font-mono text-xs transition-colors'
        >
          <ArrowLeft className='size-3.5' aria-hidden />
          Back home
        </Link>

        <header className='mt-8' data-reveal>
          <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl'>
            Writing
          </h1>
          <p className='text-muted mt-4 text-lg'>
            Notes on software development, the web platform, and building
            things.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className='text-faint mt-16 font-mono text-sm' data-reveal>
            Nothing published here yet — check back soon.
          </p>
        ) : (
          <ul className='divide-border border-border mt-14 divide-y border-y'>
            {posts.map((post, i) => (
              <li key={`${post.url}-${i}`} data-reveal>
                <a
                  href={post.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6'
                >
                  <div className='min-w-0'>
                    <span className='text-foreground group-hover:text-accent flex items-center gap-2 text-base font-medium transition-colors'>
                      <span className='truncate'>{post.title}</span>
                      <ArrowUpRight
                        className='size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100'
                        aria-hidden
                      />
                    </span>
                    {post.subtitle ? (
                      <span className='text-muted mt-1 block text-sm'>
                        {post.subtitle}
                      </span>
                    ) : null}
                  </div>
                  <span className='text-faint shrink-0 font-mono text-xs tabular-nums'>
                    {post.platform} · {formatDate(post.publishedAt)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
}
