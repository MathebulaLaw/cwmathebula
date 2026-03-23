import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { fetchSiteContent } from "@/lib/cms-api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save } from "lucide-react";

export function SiteContentEditor() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'about' | 'contact'>('about');

  const { data: aboutData, isLoading: loadingAbout } = useQuery({
    queryKey: ['site_content', 'about'],
    queryFn: () => fetchSiteContent('about')
  });

  const { data: contactData, isLoading: loadingContact } = useQuery({
    queryKey: ['site_content', 'contact'],
    queryFn: () => fetchSiteContent('contact')
  });

  const updateContentMutation = useMutation({
    mutationFn: async ({ section, content }: { section: string, content: any }) => {
      const { error } = await supabase
        .from('site_content')
        .update({ content })
        .eq('section_id', section);
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['site_content', variables.section] });
      alert("Changes saved successfully!");
    },
    onError: (error) => {
      alert("Failed to save changes: " + error.message);
    }
  });

  // Local state for editing About
  const [aboutForm, setAboutForm] = useState<any>({ main_paragraphs: [], highlights: [] });
  // Local state for editing Contact
  const [contactForm, setContactForm] = useState<any>({ emails: [], phones: [], locations: [] });

  useEffect(() => {
    if (aboutData) setAboutForm(aboutData);
  }, [aboutData]);

  useEffect(() => {
    if (contactData) setContactForm(contactData);
  }, [contactData]);

  const handleSaveAbout = () => updateContentMutation.mutate({ section: 'about', content: aboutForm });
  const handleSaveContact = () => updateContentMutation.mutate({ section: 'contact', content: contactForm });

  if (loadingAbout || loadingContact) return <div>Loading CMS data...</div>;

  return (
    <div className="space-y-8 mt-4">
      <div className="flex gap-4 border-b pb-2">
        <Button variant={activeTab === 'about' ? 'default' : 'ghost'} onClick={() => setActiveTab('about')}>
          About Page content
        </Button>
        <Button variant={activeTab === 'contact' ? 'default' : 'ghost'} onClick={() => setActiveTab('contact')}>
          Contact Page content
        </Button>
      </div>

      {activeTab === 'about' && (
        <Card>
          <CardHeader>
            <CardTitle>About Us Section</CardTitle>
            <CardDescription>Edit the main text paragraphs and the four highlight boxes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Main Paragraphs</h3>
              {aboutForm.main_paragraphs?.map((para: string, idx: number) => (
                <div key={idx} className="flex gap-2">
                  <Textarea 
                    value={para} 
                    onChange={e => {
                      const newParas = [...aboutForm.main_paragraphs];
                      newParas[idx] = e.target.value;
                      setAboutForm({ ...aboutForm, main_paragraphs: newParas });
                    }}
                    rows={4}
                  />
                  <Button variant="destructive" size="icon" onClick={() => {
                    const newParas = aboutForm.main_paragraphs.filter((_: any, i: number) => i !== idx);
                    setAboutForm({ ...aboutForm, main_paragraphs: newParas });
                  }}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => {
                setAboutForm({ ...aboutForm, main_paragraphs: [...(aboutForm.main_paragraphs || []), ""] });
              }}>
                <Plus className="w-4 h-4 mr-2" /> Add Paragraph
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aboutForm.highlights?.map((hl: any, idx: number) => (
                  <Card key={idx} className="p-4 space-y-3">
                    <div>
                      <Label>Title</Label>
                      <Input value={hl.title} onChange={e => {
                        const newHl = [...aboutForm.highlights];
                        newHl[idx].title = e.target.value;
                        setAboutForm({ ...aboutForm, highlights: newHl });
                      }} />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea value={hl.description} onChange={e => {
                        const newHl = [...aboutForm.highlights];
                        newHl[idx].description = e.target.value;
                        setAboutForm({ ...aboutForm, highlights: newHl });
                      }} />
                    </div>
                    <div>
                      <Label>Icon Name (Lucide)</Label>
                      <Input value={hl.icon} onChange={e => {
                        const newHl = [...aboutForm.highlights];
                        newHl[idx].icon = e.target.value;
                        setAboutForm({ ...aboutForm, highlights: newHl });
                      }} />
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => {
                      const newHl = aboutForm.highlights.filter((_: any, i: number) => i !== idx);
                      setAboutForm({ ...aboutForm, highlights: newHl });
                    }}>Remove</Button>
                  </Card>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={() => {
                setAboutForm({ ...aboutForm, highlights: [...(aboutForm.highlights || []), { title: '', description: '', icon: 'Award' }] });
              }}>
                <Plus className="w-4 h-4 mr-2" /> Add Highlight
              </Button>
            </div>

            <Button onClick={handleSaveAbout} disabled={updateContentMutation.isPending}>
              <Save className="w-4 h-4 mr-2" /> Save About Section
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'contact' && (
        <Card>
          <CardHeader>
            <CardTitle>Contact Us Section</CardTitle>
            <CardDescription>Edit contact emails, phone numbers, and office locations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <ArrayInputList 
              title="Email Addresses" 
              items={contactForm.emails || []} 
              onChange={(newItems) => setContactForm({ ...contactForm, emails: newItems })} 
            />
            
            <ArrayInputList 
              title="Phone Numbers" 
              items={contactForm.phones || []} 
              onChange={(newItems) => setContactForm({ ...contactForm, phones: newItems })} 
            />

            <ArrayInputList 
              title="Office Locations" 
              items={contactForm.locations || []} 
              onChange={(newItems) => setContactForm({ ...contactForm, locations: newItems })} 
            />

            <Button onClick={handleSaveContact} disabled={updateContentMutation.isPending}>
              <Save className="w-4 h-4 mr-2" /> Save Contact Details
            </Button>
          </CardContent>
        </Card>
      )}

    </div>
  );
}

function ArrayInputList({ title, items, onChange }: { title: string, items: string[], onChange: (items: string[]) => void }) {
  return (
    <div className="space-y-2">
      <Label className="text-base">{title}</Label>
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <Input 
            value={item} 
            onChange={e => {
              const newItems = [...items];
              newItems[idx] = e.target.value;
              onChange(newItems);
            }} 
          />
          <Button variant="destructive" size="icon" onClick={() => {
            const newItems = items.filter((_, i) => i !== idx);
            onChange(newItems);
          }}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" className="mt-2" onClick={() => onChange([...items, ""])}>
        <Plus className="w-4 h-4 mr-2" /> Add
      </Button>
      <div className="h-4"></div>
    </div>
  );
}
