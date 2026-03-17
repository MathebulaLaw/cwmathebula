import { useParams, Link } from 'react-router-dom';
import { usePost } from '@/hooks/use-blog';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = usePost(slug || '');

  return (
    <Layout showBlogActive>
      {!post ? (
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article not found</h1>
          <Link to="/blog">
            <Button className="bg-gold text-navy hover:bg-gold-light">Back to Blog</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-navy py-12">
            <div className="container mx-auto px-6">
              <Link to="/blog" className="inline-flex items-center text-gold hover:text-gold-light mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                </span>
                {post.updatedAt.getTime() !== post.createdAt.getTime() && (
                  <span className="text-sm">
                    (Updated: {format(new Date(post.updatedAt), 'MMMM d, yyyy')})
                  </span>
                )}
              </div>
              {post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} className="bg-gold text-navy hover:bg-gold-light">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="container mx-auto px-6 py-12 max-w-4xl">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <div 
                className="text-lg leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            <div className="mt-12 pt-8 border-t">
              <Link to="/blog">
                <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  All Articles
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
