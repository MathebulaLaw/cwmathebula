import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts, useTags, useSearchPosts } from '@/hooks/use-blog';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, FileText } from 'lucide-react';
import { format } from 'date-fns';

const POSTS_PER_PAGE = 5;

export default function BlogIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const posts = usePosts();
  const tags = useTags();
  const searchResults = useSearchPosts(searchQuery);
  
  const displayedPosts = searchQuery ? searchResults : posts;
  
  const totalPages = displayedPosts ? Math.ceil(displayedPosts.length / POSTS_PER_PAGE) : 0;
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = displayedPosts?.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <Layout showBlogActive>
      <div className="bg-navy py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-primary-foreground mb-2">Legal Insights</h1>
          <p className="text-muted-foreground text-lg">Expert legal commentary and updates from our practice areas</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="pl-10 bg-white"
                />
              </div>
            </div>

            {tags && tags.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Badge 
                    key={tag.id} 
                    variant="secondary" 
                    className="cursor-pointer bg-navy text-white hover:bg-gold hover:text-navy"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}

            {paginatedPosts === undefined ? (
              <div className="text-center py-12 text-muted-foreground">Loading articles...</div>
            ) : paginatedPosts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">Check back later for legal insights</p>
              </div>
            ) : (
              <div className="space-y-6">
                {paginatedPosts.map(post => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-gold">
                    <CardHeader>
                      <Link to={`/blog/${post.slug}`} className="hover:text-gold transition-colors">
                        <CardTitle className="text-2xl line-clamp-2">{post.title}</CardTitle>
                      </Link>
                      <CardDescription className="flex items-center gap-2 text-base">
                        <span>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
                        {post.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <div className="flex gap-1">
                              {post.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-gold">{tag}</span>
                              ))}
                            </div>
                          </>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-4">{post.excerpt}</p>
                      <Link to={`/blog/${post.slug}`}>
                        <Button variant="link" className="px-0 text-gold hover:text-gold-light text-base">
                          Read more →
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="border-navy text-navy hover:bg-navy hover:text-white"
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-gold text-navy hover:bg-gold-light" : "border-navy text-navy hover:bg-navy hover:text-white"}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="border-navy text-navy hover:bg-navy hover:text-white"
                >
                  Next
                </Button>
              </div>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <Card className="bg-navy text-primary-foreground border-none">
                <CardHeader>
                  <CardTitle className="text-lg text-gold">Recent Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {displayedPosts?.slice(0, 8).map(post => (
                      <Link 
                        key={post.id} 
                        to={`/blog/${post.slug}`}
                        className="block group"
                      >
                        <p className="text-sm font-medium group-hover:text-gold transition-colors line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(post.createdAt), 'MMM d, yyyy')}
                        </p>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {tags && tags.length > 0 && (
                <Card className="bg-navy text-primary-foreground border-none">
                  <CardHeader>
                    <CardTitle className="text-lg text-gold">Practice Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {tags?.map(tag => (
                        <Link 
                          key={tag.id} 
                          to={`/blog?tag=${tag.slug}`}
                          className="flex justify-between items-center text-sm hover:text-gold transition-colors"
                        >
                          <span>{tag.name}</span>
                          <Badge variant="outline" className="text-xs border-gold text-gold">{tag.count}</Badge>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
