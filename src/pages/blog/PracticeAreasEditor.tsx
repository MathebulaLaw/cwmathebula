import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { fetchPracticeAreas, PracticeArea } from "@/lib/cms-api";
import { iconMap } from "@/lib/icons";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save, GripVertical } from "lucide-react";

export function PracticeAreasEditor() {
  const queryClient = useQueryClient();

  const { data: areas, isLoading } = useQuery({
    queryKey: ['practice_areas'],
    queryFn: fetchPracticeAreas
  });

  const [editingArea, setEditingArea] = useState<Partial<PracticeArea> | null>(null);

  const saveMutation = useMutation({
    mutationFn: async (area: Partial<PracticeArea>) => {
      if (area.id) {
        const { error } = await supabase.from('practice_areas').update(area).eq('id', area.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('practice_areas').insert([area]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['practice_areas'] });
      setEditingArea(null);
      alert("Practice area saved.");
    },
    onError: (err) => alert("Failed to save: " + err.message)
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('practice_areas').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['practice_areas'] });
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6 mt-4">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold">Practice Areas</h2>
          <p className="text-muted-foreground">Manage the legal services offered.</p>
        </div>
        <Button onClick={() => setEditingArea({ title: '', description: '', icon_name: 'Scale', display_order: (areas?.length || 0) + 1 })}>
          <Plus className="w-4 h-4 mr-2" /> Add Area
        </Button>
      </div>

      {editingArea && (
        <Card className="border-gold shadow-gold-sm">
          <CardHeader>
            <CardTitle>{editingArea.id ? "Edit Practice Area" : "New Practice Area"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input 
                value={editingArea.title} 
                onChange={e => setEditingArea({ ...editingArea, title: e.target.value })} 
                placeholder="e.g., Commercial Law"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea 
                value={editingArea.description} 
                onChange={e => setEditingArea({ ...editingArea, description: e.target.value })} 
                placeholder="Short description..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Icon Name</Label>
                <div className="flex gap-2 mt-1">
                  <Input 
                    value={editingArea.icon_name} 
                    onChange={e => setEditingArea({ ...editingArea, icon_name: e.target.value })} 
                    placeholder="e.g., Building2"
                  />
                  <div className="flex items-center justify-center p-2 border rounded bg-muted/50 w-10 h-10">
                    {(() => {
                      const Icon = iconMap[editingArea.icon_name || 'Scale'];
                      return Icon ? <Icon className="w-5 h-5 text-gold" /> : <div className="text-xs">?</div>;
                    })()}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Must be an available Lucide icon name.</p>
              </div>
              <div>
                <Label>Display Order</Label>
                <Input 
                  type="number" 
                  value={editingArea.display_order} 
                  onChange={e => setEditingArea({ ...editingArea, display_order: parseInt(e.target.value) || 0 })} 
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditingArea(null)}>Cancel</Button>
              <Button onClick={() => saveMutation.mutate(editingArea)} disabled={saveMutation.isPending || !editingArea.title}>
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {areas?.map((area: PracticeArea) => {
          const Icon = iconMap[area.icon_name] || iconMap['Scale'];
          return (
            <Card key={area.id} className="relative group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Icon className="w-8 h-8 text-gold" />
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" onClick={() => setEditingArea(area)}>
                      <span className="sr-only">Edit</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => {
                      if(confirm('Are you sure you want to delete this practice area?')) {
                        deleteMutation.mutate(area.id);
                      }
                    }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 truncate">{area.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{area.description}</p>
                <div className="mt-4 text-xs font-mono text-muted-foreground">Order: {area.display_order}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
