import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RichTextEditor } from '@/components/blog/RichTextEditor';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createDraft, updateDraft, createPost, useDrafts } from '@/hooks/use-blog';
import { ArrowLeft, Save, Trash2, Send, FileText, X } from 'lucide-react';

export default function NewPost() {
  const navigate = useNavigate();
  const drafts = useDrafts();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const saveDraft = useCallback(async () => {
    if (!title.trim() && !content.trim()) return;
    
    setIsSaving(true);
    try {
      if (currentDraftId) {
        await updateDraft(currentDraftId, { title, content, tags });
      } else {
        const draft = await createDraft({ title, content, tags });
        setCurrentDraftId(draft.id);
      }
      setLastSaved(new Date());
    } finally {
      setIsSaving(false);
    }
  }, [title, content, tags, currentDraftId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft();
    }, 3000);

    return () => clearTimeout(timer);
  }, [title, content, tags, saveDraft]);

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      alert('Please add a title');
      return;
    }
    
    await createPost({ title, content, tags });
    
    if (currentDraftId) {
      await updateDraft(currentDraftId, { title, content, tags });
    }
    
    navigate('/blog');
  };

  const handleDeleteDraft = async () => {
    if (currentDraftId) {
      await updateDraft(currentDraftId, { title: '', content: '' });
      navigate('/blog');
    } else {
      navigate('/blog');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <span className="text-sm text-muted-foreground">
                {isSaving ? 'Saving...' : lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` : 'Draft'}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={saveDraft}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handlePublish}>
              <Send className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Input
              placeholder="Post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-3xl font-bold border-0 px-0 focus-visible:ring-0"
            />
            
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing your post..."
            />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" onClick={handleAddTag} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer">
                      {tag}
                      <X 
                        className="w-3 h-3 ml-1" 
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {drafts && drafts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Drafts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {drafts.slice(0, 5).map(draft => (
                    <div key={draft.id} className="flex items-center justify-between">
                      <Link 
                        to={`/blog/draft/${draft.id}`}
                        className="flex items-center gap-2 text-sm hover:underline"
                      >
                        <FileText className="w-4 h-4" />
                        <span className="truncate max-w-[150px]">
                          {draft.title || 'Untitled'}
                        </span>
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
