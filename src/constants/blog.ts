export interface BlogPost {
  title: string;
  subtitle: string | null;
  url: string;
  views: number;
  publishedAt: string;
  coverImage: {
    url: string | null;
  } | null;
}

const API_URL = 'https://gql.hashnode.com';
const USERNAME = 'codebyaadi';

export async function getBlogPosts(): Promise<BlogPost[]> {
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
  }
`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
    }

    const { data } = await response.json();
    return (data?.user?.posts?.nodes || []) as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}
