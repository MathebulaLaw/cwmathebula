import { supabase } from './supabase';

export interface SiteContent {
  section_id: string;
  content: any;
}

export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string;
  short_description: string;
  extended_bio: string;
  qualifications: string[];
  is_support_staff: boolean;
  display_order: number;
}

export async function fetchSiteContent(sectionId: string): Promise<any | null> {
  const { data, error } = await supabase
    .from('site_content')
    .select('content')
    .eq('section_id', sectionId)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') { // not found
      console.error(`Error fetching site content for ${sectionId}:`, error);
    }
    return null;
  }
  return data?.content;
}

export async function fetchPracticeAreas(): Promise<PracticeArea[]> {
  const { data, error } = await supabase
    .from('practice_areas')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching practice areas:', error);
    return [];
  }
  return data || [];
}

export async function fetchTeamMembers(isSupport: boolean = false): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_support_staff', isSupport)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
  return data || [];
}
