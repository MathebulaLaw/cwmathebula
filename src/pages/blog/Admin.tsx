import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAllPosts, useDrafts, useTags, exportData, importData } from '@/hooks/use-blog';
import { logout } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Upload, FileText, Trash2, Edit, LogOut, Plus } from 'lucide-react';
import { format } from 'date-fns';

export default function BlogAdmin() {
  const navigate = useNavigate();
  const allPosts = useAllPosts();
  const drafts = useDrafts();
  const tags = useTags();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/blog');
  };

  const handleExport = async () => {
    const data = await exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cwmathebula-blog-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        await importData(content);
        alert('Data imported successfully!');
        window.location.reload();
      } catch (error) {
        alert('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Blog Admin</h1>
          </div>
          <div className="flex gap-2">
            <Link to="/blog/admin/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Posts</CardTitle>
              <CardDescription>Published blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{allPosts?.filter(p => p.published).length || 0}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Drafts</CardTitle>
              <CardDescription>Unpublished drafts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{drafts?.length || 0}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tags</CardTitle>
              <CardDescription>Unique tags used</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{tags?.length || 0}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>All Posts</CardTitle>
              <CardDescription>Manage your published posts</CardDescription>
            </CardHeader>
            <CardContent>
              {allPosts?.filter(p => p.published).length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No posts yet</p>
              ) : (
                <div className="space-y-2">
                  {allPosts?.filter(p => p.published).map(post => (
                    <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{post.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(post.createdAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Link to={`/blog/${post.slug}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Drafts</CardTitle>
              <CardDescription>Your unpublished drafts</CardDescription>
            </CardHeader>
            <CardContent>
              {drafts?.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No drafts</p>
              ) : (
                <div className="space-y-2">
                  {drafts?.map(draft => (
                    <div key={draft.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{draft.title || 'Untitled'}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(draft.updatedAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <Link to={`/blog/draft/${draft.id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {tags && tags.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>All tags used in your blog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Badge key={tag.id} variant="secondary">
                    {tag.name} ({tag.count})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
