import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { fetchTeamMembers, TeamMember } from "@/lib/cms-api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Save, Upload, UserRound } from "lucide-react";

export function TeamEditor() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: mainTeam, isLoading: loadingMain } = useQuery({ queryKey: ['team_members', false], queryFn: () => fetchTeamMembers(false) });
  const { data: supportTeam, isLoading: loadingSupport } = useQuery({ queryKey: ['team_members', true], queryFn: () => fetchTeamMembers(true) });

  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const saveMutation = useMutation({
    mutationFn: async (member: Partial<TeamMember>) => {
      if (member.id) {
        const { error } = await supabase.from('team_members').update(member).eq('id', member.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('team_members').insert([member]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team_members'] });
      setEditingMember(null);
      alert("Team member saved.");
    },
    onError: (err) => alert("Failed to save: " + err.message)
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team_members'] });
    }
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editingMember) return;

    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('team-photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('team-photos').getPublicUrl(filePath);
      setEditingMember({ ...editingMember, image_url: data.publicUrl });
      
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddNew = () => {
    setEditingMember({
      name: '',
      role: '',
      image_url: '',
      short_description: '',
      extended_bio: '',
      qualifications: [],
      is_support_staff: false,
      display_order: 1
    });
  };

  if (loadingMain || loadingSupport) return <div>Loading...</div>;

  const allMembers = [...(mainTeam || []), ...(supportTeam || [])].sort((a,b) => a.display_order - b.display_order);

  return (
    <div className="space-y-6 mt-4">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold">Team Members</h2>
          <p className="text-muted-foreground">Manage the Our People section.</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" /> Add Team Member
        </Button>
      </div>

      {editingMember && (
        <Card className="border-gold shadow-gold-sm">
          <CardHeader>
            <CardTitle>{editingMember.id ? "Edit Team Member" : "New Team Member"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg bg-muted/20">
                  {editingMember.image_url ? (
                    <img src={editingMember.image_url} alt="Preview" className="w-32 h-32 rounded-full object-cover mb-4 shadow-md" />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-4">
                      <UserRound className="w-12 h-12 text-muted-foreground opacity-50" />
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage}>
                    {uploadingImage ? "Uploading..." : <><Upload className="w-4 h-4 mr-2" /> Upload Photo</>}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Recommended: Square image, max 2MB</p>
                </div>

                <div>
                  <Label>Name</Label>
                  <Input value={editingMember.name || ''} onChange={e => setEditingMember({ ...editingMember, name: e.target.value })} />
                </div>
                <div>
                  <Label>Role / Title</Label>
                  <Input value={editingMember.role || ''} onChange={e => setEditingMember({ ...editingMember, role: e.target.value })} />
                </div>
                <div>
                  <Label>Short Description</Label>
                  <Textarea value={editingMember.short_description || ''} onChange={e => setEditingMember({ ...editingMember, short_description: e.target.value })} rows={3} />
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox 
                    id="support-staff" 
                    checked={editingMember.is_support_staff} 
                    onCheckedChange={(c) => setEditingMember({...editingMember, is_support_staff: !!c})}
                  />
                  <Label htmlFor="support-staff">Is Support Staff (displays in bottom section)</Label>
                </div>
                
                <div>
                  <Label>Display Order</Label>
                  <Input type="number" value={editingMember.display_order || 0} onChange={e => setEditingMember({ ...editingMember, display_order: parseInt(e.target.value) || 0 })} />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <Label>Extended Bio</Label>
                  <Textarea 
                    value={editingMember.extended_bio || ''} 
                    onChange={e => setEditingMember({ ...editingMember, extended_bio: e.target.value })} 
                    rows={10} 
                    placeholder="Enter full bio. Use double newlines for paragraph breaks."
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Qualifications</Label>
                  <div className="space-y-2">
                    {editingMember.qualifications?.map((qual, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input 
                          value={qual} 
                          onChange={e => {
                            const newQuals = [...(editingMember.qualifications || [])];
                            newQuals[idx] = e.target.value;
                            setEditingMember({ ...editingMember, qualifications: newQuals });
                          }} 
                        />
                        <Button variant="destructive" size="icon" onClick={() => {
                          const newQuals = editingMember.qualifications?.filter((_, i) => i !== idx);
                          setEditingMember({ ...editingMember, qualifications: newQuals });
                        }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => {
                       setEditingMember({ ...editingMember, qualifications: [...(editingMember.qualifications || []), ""] });
                    }}>
                      <Plus className="w-4 h-4 mr-2" /> Add Qualification
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setEditingMember(null)}>Cancel</Button>
              <Button onClick={() => saveMutation.mutate(editingMember)} disabled={saveMutation.isPending || !editingMember.name || !editingMember.role}>
                <Save className="w-4 h-4 mr-2" /> Save Member
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gold">Main Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mainTeam?.map(renderMemberCard)}
          </div>
        </div>
        
        {supportTeam && supportTeam.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold mt-8 border-t pt-8">Support Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {supportTeam.map(renderMemberCard)}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function renderMemberCard(member: TeamMember) {
    return (
      <Card key={member.id} className="relative group overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-square w-full bg-muted relative">
            <img src={member.image_url || '/placeholder.svg'} alt={member.name} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button variant="secondary" size="sm" onClick={() => setEditingMember(member)}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => {
                if(confirm(`Delete ${member.name}?`)) deleteMutation.mutate(member.id);
              }}>Delete</Button>
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-bold truncate" title={member.name}>{member.name}</h4>
            <p className="text-sm text-muted-foreground truncate">{member.role}</p>
            <p className="text-xs text-muted-foreground mt-2 font-mono">Order: {member.display_order}</p>
          </div>
        </CardContent>
      </Card>
    );
  }
}
