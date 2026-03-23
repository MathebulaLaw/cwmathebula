import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdminSetup, sendMagicLink, login } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

const ALLOWED_EMAILS = ['siya360@gmail.com', 'wisani@mathebulalaw.co.za'];

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // Check initial session in case they are already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        login(); // Sync with local sessionStorage
        navigate('/blog/admin');
      }
    };
    checkSession();

    // Listen for auth state changes (e.g., when the magic link resolves)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        login(); // Sync with local sessionStorage
        navigate('/blog/admin');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!ALLOWED_EMAILS.includes(email.toLowerCase())) {
      setError('Access denied: Unauthorized email address');
      return;
    }

    setLoading(true);

    try {
      const { success, error: authError } = await sendMagicLink(email);
      if (success) {
        setEmailSent(true);
      } else {
        setError(authError || 'Failed to send magic link');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 text-[#1A1F2C]">
        <Card className="w-full max-w-md border-primary/20 bg-white shadow-2xl">
          <CardHeader className="text-center space-y-1">
            <div className="mx-auto bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Check your email</CardTitle>
            <CardDescription className="text-base">
              A magic link has been sent to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Click the link in the email to sign in to the admin dashboard. 
              You can close this window.
            </p>
            <Button variant="outline" onClick={() => setEmailSent(false)} className="mt-4">
              Try a different email
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 text-[#1A1F2C]">
      <Card className="w-full max-w-md border-primary/20 bg-white shadow-2xl">
        <CardHeader className="text-center space-y-1">
          <div className="mx-auto bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-primary">
            <Mail className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Admin Portal</CardTitle>
          <CardDescription className="text-base">
            Enter your email to receive a secure magic link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Email Address</label>
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 px-4 border-input focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            {error && (
              <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm font-medium border border-red-100 italic">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.01]" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                  Sending Link...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Send Magic Link <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
