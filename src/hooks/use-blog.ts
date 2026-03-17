import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

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

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);
}

function extractExcerpt(content: string, maxLength = 150): string {
  const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Map database row to component Post type
function mapPost(row: any): Post {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    excerpt: row.excerpt,
    slug: row.slug,
    tags: row.tags || [],
    published: row.published,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at)
  };
}

export function usePosts() {
  const { data } = useQuery({
    queryKey: ['posts', 'published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(mapPost);
    }
  });
  return data;
}

export function useAllPosts() {
  const { data } = useQuery({
    queryKey: ['posts', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(mapPost);
    }
  });
  return data;
}

export function usePost(idOrSlug: string | undefined) {
  const { data } = useQuery({
    queryKey: ['post', idOrSlug],
    queryFn: async () => {
      if (!idOrSlug) return null;
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
      const query = supabase.from('posts').select('*');

      if (isUuid) {
        query.eq('id', idOrSlug);
      } else {
        query.eq('slug', idOrSlug);
      }

      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return data ? mapPost(data) : null;
    },
    enabled: !!idOrSlug
  });
  return data;
}

export function useDraft(id: string | undefined) {
  return usePost(id);
}

export function useTags() {
  const { data } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tags')
        .select('*');

      if (error) throw error;
      return data as Tag[];
    }
  });
  return data;
}

export function useSearchPosts(query: string) {
  const { data } = useQuery({
    queryKey: ['posts', 'search', query],
    queryFn: async () => {
      if (!query.trim()) {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });
        if (error) throw error;
        return (data || []).map(mapPost);
      }

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(mapPost);
    }
  });
  return data;
}

export function useDrafts() {
  const { data } = useQuery({
    queryKey: ['posts', 'drafts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', false)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(mapPost);
    }
  });
  return data;
}

export async function createPost(data: { title: string; content: string; tags: string[] }): Promise<Post> {
  const { data: post, error } = await supabase
    .from('posts')
    .insert([{
      title: data.title,
      content: data.content,
      excerpt: extractExcerpt(data.content),
      slug: generateSlug(data.title),
      published: true,
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw error;

  // Handle tags (simplified for now, ideally post_tags join)
  if (data.tags.length > 0) {
    for (const tagName of data.tags) {
      const slug = tagName.toLowerCase().replace(/\s+/g, '-');
      const { data: tagData } = await supabase
        .from('tags')
        .upsert({ name: tagName, slug }, { onConflict: 'name' })
        .select()
        .single();

      if (tagData) {
        await supabase.from('post_tags').upsert({ post_id: post.id, tag_id: tagData.id }, { onConflict: 'post_id,tag_id' });
      }
    }
  }

  return mapPost(post);
}

export async function updatePost(id: string, data: Partial<Omit<Post, 'id' | 'createdAt'>>): Promise<void> {
  const updates: any = {};
  if (data.title !== undefined) updates.title = data.title;
  if (data.content !== undefined) {
    updates.content = data.content;
    updates.excerpt = extractExcerpt(data.content);
  }
  if (data.slug !== undefined) updates.slug = data.slug;
  if (data.published !== undefined) updates.published = data.published;
  updates.updated_at = new Date().toISOString();

  const { error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function createDraft(data: { title?: string; content?: string; tags?: string[] } = {}): Promise<Post> {
  const { data: post, error } = await supabase
    .from('posts')
    .insert([{
      title: data.title || 'Untitled Draft',
      content: data.content || '',
      excerpt: data.content ? extractExcerpt(data.content) : '',
      slug: data.title ? generateSlug(data.title) : `draft-${Date.now()}`,
      published: false,
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw error;
  return mapPost(post);
}

export async function updateDraft(id: string, data: Partial<Omit<Post, 'id' | 'createdAt'>>): Promise<void> {
  return updatePost(id, data);
}

export async function deleteDraft(id: string): Promise<void> {
  return deletePost(id);
}

export async function publishDraft(draftId: string): Promise<Post> {
  const { data: post, error } = await supabase
    .from('posts')
    .update({
      published: true,
      updated_at: new Date().toISOString()
    })
    .eq('id', draftId)
    .select()
    .single();

  if (error) throw error;
  return mapPost(post);
}

export async function exportData(): Promise<string> {
  return JSON.stringify({ posts: [], drafts: [], tags: [] });
}

export async function importData(jsonString: string): Promise<void> {
  return;
}
