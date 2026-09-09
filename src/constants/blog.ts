interface HashnodePostResponse {
  data?: {
    user?: {
      posts?: {
        nodes?: Array<{
          title: string;
          subtitle: string | null;
          url: string;
          views: number;
          publishedAt: string;
          coverImage?: {
            url: string | null;
          } | null;
        }>;
      };
    };
  };
}

interface MediumRssItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
}

interface MediumRssResponse {
  items: MediumRssItem[];
}

export interface BlogPost {
  title: string;
  subtitle: string | null;
  url: string;
  views: number;
  publishedAt: string;
  coverImage: {
    url: string | null;
  } | null;
  platform: 'Hashnode' | 'Medium';
}

const USERNAME = 'codebyaadi';
const HASHNODE_API_URL = 'https://gql.hashnode.com';
const MEDIUM_RSS_URL = `https://medium.com/feed/@${USERNAME}`;

export async function getBlogPosts(): Promise<BlogPost[]> {
  const [hashnodePosts, mediumPosts] = await Promise.all([
    fetchHashnodePosts(),
    fetchMediumPosts(),
  ]);

  return [...hashnodePosts, ...mediumPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

function isValidHashnodePost(post: unknown): post is BlogPost {
  if (typeof post !== 'object' || post === null) return false;
  const p = post as Partial<BlogPost>;
  return (
    typeof p.title === 'string' &&
    (p.subtitle === null || typeof p.subtitle === 'string') &&
    typeof p.url === 'string' &&
    typeof p.views === 'number' &&
    typeof p.publishedAt === 'string'
  );
}

function isValidMediumRssItem(item: unknown): item is MediumRssItem {
  if (typeof item !== 'object' || item === null) return false;
  const i = item as Partial<MediumRssItem>;
  return (
    typeof i.title === 'string' &&
    typeof i.link === 'string' &&
    typeof i.pubDate === 'string'
  );
}

async function fetchHashnodePosts(): Promise<BlogPost[]> {
  const query = `
  query {
    user(username: "${USERNAME}") {
      posts(page: 1, pageSize: 10) {
        nodes {
          title
          subtitle
          url
          views
          publishedAt
          coverImage {
            url
          }
        }
      }
    }
  }`;

  try {
    const response = await fetch(HASHNODE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    // No Hashnode publication for this user, or the endpoint returned an
    // error page — treat as "no posts" rather than a hard failure.
    if (
      !response.ok ||
      !response.headers.get('content-type')?.includes('json')
    ) {
      return [];
    }

    const responseData: HashnodePostResponse = await response.json();
    const nodes = responseData.data?.user?.posts?.nodes || [];

    return nodes
      .map((post) => ({
        ...post,
        platform: 'Hashnode' as const,
        subtitle: post.subtitle || null,
        coverImage: post.coverImage ? { url: post.coverImage.url } : null,
      }))
      .filter(isValidHashnodePost);
  } catch {
    return [];
  }
}

async function fetchMediumPosts(): Promise<BlogPost[]> {
  try {
    const rssToJsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`;

    const response = await fetch(rssToJsonUrl);
    if (!response.ok) return [];

    const data: MediumRssResponse = await response.json();

    return (data.items ?? []).filter(isValidMediumRssItem).map((post) => ({
      title: post.title,
      subtitle: null,
      url: post.link,
      views: 0,
      publishedAt: post.pubDate,
      coverImage: post.thumbnail ? { url: post.thumbnail } : null,
      platform: 'Medium' as const,
    }));
  } catch {
    return [];
  }
}
