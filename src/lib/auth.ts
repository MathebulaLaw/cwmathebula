import { supabase } from './supabase';

export async function isAdminSetup(): Promise<boolean> {
  // Always true for now as we have a user in Supabase
  return true;
}

export async function verifyAdmin(email: string, password: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Auth error:', error.message);
      return false;
    }

    return !!data.user;
  } catch (err) {
    console.error('Auth exception:', err);
    return false;
  }
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem('blog_auth') === 'true';
}

export function login(): void {
  sessionStorage.setItem('blog_auth', 'true');
}

export function logout(): void {
  sessionStorage.removeItem('blog_auth');
  supabase.auth.signOut();
}
