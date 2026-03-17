import Dexie, { Table } from 'dexie';

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Draft {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

class BlogDatabase extends Dexie {
  posts!: Table<Post>;
  drafts!: Table<Draft>;
  tags!: Table<Tag>;

  constructor() {
    super('cwmathebula-blog');
    this.version(1).stores({
      posts: 'id, slug, title, published, createdAt, updatedAt, *tags',
      drafts: 'id, title, createdAt, updatedAt',
      tags: 'id, name, slug'
    });
  }
}

export const db = new BlogDatabase();

export async function updateTagCounts() {
  const allPosts = await db.posts.toArray();
  const posts = allPosts.filter(p => p.published);
  const tagCounts: Record<string, number> = {};
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  await db.tags.clear();
  const tags: Tag[] = Object.entries(tagCounts).map(([name, count]) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    count
  }));

  if (tags.length > 0) {
    await db.tags.bulkPut(tags);
  }
}
