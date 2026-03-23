import { supabase } from './supabase';

export async function isAdminSetup(): Promise<boolean> {
  // Always true for now as we have a user in Supabase
  return true;
}

export async function sendMagicLink(email: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const isLocal = window.location.hostname === 'localhost';
    const port = window.location.port;
    const redirectTo = isLocal 
      ? `http://localhost:${port}/blog/login` 
      : 'https://mathebulalaw.co.za/blog/login';

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      console.error('Auth error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('Auth exception:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// Sync Supabase auth state with session storage for legacy compatibility
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    sessionStorage.setItem('blog_auth', 'true');
  } else if (event === 'SIGNED_OUT') {
    sessionStorage.removeItem('blog_auth');
  }
});

export function isAuthenticated(): boolean {
  // Check session storage first (legacy/synchronous check for redirects)
  const isAuth = sessionStorage.getItem('blog_auth') === 'true';
  return isAuth;
}

export function login(): void {
  sessionStorage.setItem('blog_auth', 'true');
}

export async function logout(): Promise<void> {
  sessionStorage.removeItem('blog_auth');
  await supabase.auth.signOut();
}
