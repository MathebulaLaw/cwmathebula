import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { isAdminSetup, signInWithPassword, login } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

const ALLOWED_EMAILS = ['siya360@gmail.com', 'wisani@mathebulalaw.co.za'];

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

    // Listen for auth state changes
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
      const { success, error: authError } = await signInWithPassword(email, password);
      if (success) {
        // Redirect handled by onAuthStateChange
      } else {
        setError(authError || 'Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-gold blur-3xl" />
      </div>

      <Card className="w-full max-w-md border-gold/20 bg-white/95 backdrop-blur-sm shadow-gold relative z-10 transition-smooth hover:shadow-gold-heavy">
        <CardHeader className="text-center space-y-4 pt-8">
          <div className="mx-auto flex flex-col items-center">
            <Link to="/">
              <img 
                src="/logo.png" 
                alt="CW Mathebula & Associates" 
                className="h-32 w-auto mb-2 filter drop-shadow-sm hover:scale-105 transition-smooth" 
              />
            </Link>
            <div className="w-16 h-1 bg-gold my-4 rounded-full" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-navy">
            Admin Portal
          </CardTitle>
          <CardDescription className="text-muted-foreground font-medium uppercase tracking-widest text-xs">
            Professional Access Only
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-navy font-semibold flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold" /> Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="wisani@mathebulalaw.co.za"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-navy/10 focus:border-gold focus:ring-gold/20 bg-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-navy font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gold" /> Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-navy/10 focus:border-gold focus:ring-gold/20 bg-white"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm font-semibold border border-red-200 flex items-center gap-3 animate-shake">
                <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-bold bg-navy hover:bg-navy-light text-white transition-smooth shadow-lg hover:shadow-gold-sm mt-4 group" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-gold" />
                  Verifying Access...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-navy/5 text-center">
            <Link 
              to="/" 
              className="text-muted-foreground hover:text-gold text-sm transition-smooth font-medium flex items-center justify-center gap-2"
            >
              ← Return to Main Website
            </Link>
          </div>
        </CardContent>
      </Card>
      
      {/* Footer disclaimer */}
      <div className="absolute bottom-6 text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">
        Secure Legal Administration System
      </div>
    </div>
  );
}
