import BlurFade from '@/components/ui/blur-fade';
import { BlogPost, getBlogPosts } from '@/constants/blog';
import Link from 'next/link';

export const metadata = {
  title: 'Blog',
  description: 'My thoughts on software development, life, and more.',
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts: BlogPost[] = await getBlogPosts();

  return (
    <section className='font-prompt'>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className='mb-2 text-4xl font-medium tracking-tighter'>blog</h1>
        <p className='mb-8 text-lg'>
          My thoughts on software development, life, and more.
        </p>
      </BlurFade>
      {posts.map((p, idx) => (
        <BlurFade delay={BLUR_FADE_DELAY * 2 + idx * 0.05} key={idx}>
          <Link className='mb-4 flex flex-col space-y-1' href={p.url}>
            <div className='flex w-full flex-col'>
              <p className='tracking-tight'>{p.title}</p>
              <p className='h-6 text-xs text-muted-foreground'>
                {p.publishedAt}
              </p>
            </div>
          </Link>
        </BlurFade>
      ))}
    </section>
  );
}
