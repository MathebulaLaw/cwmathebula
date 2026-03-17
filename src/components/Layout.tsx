import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FloatingScrollButton from '@/components/FloatingScrollButton';

interface LayoutProps {
  children: React.ReactNode;
  showBlogActive?: boolean;
}

export default function Layout({ children, showBlogActive = false }: LayoutProps) {
  const location = useLocation();
  const isBlogPage = location.pathname.startsWith('/blog');
  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    if (isBlogPage) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white shadow-elegant">
        <div className="container mx-auto px-6 py-[2px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/">
                <img 
                  src="/logo.png" 
                  alt="CW Mathebula & Associates" 
                  className="h-40 w-auto filter drop-shadow-sm" 
                />
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/"
                className={`transition-smooth font-medium ${isHomePage ? 'text-gold' : 'text-navy hover:text-gold'}`}
              >
                Home
              </Link>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-navy hover:text-gold transition-smooth font-medium"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('practice-areas')}
                className="text-navy hover:text-gold transition-smooth font-medium"
              >
                Practice Areas
              </button>
              <Link 
                to="/blog"
                className={`transition-smooth font-medium ${showBlogActive || location.pathname.startsWith('/blog') ? 'text-gold' : 'text-navy hover:text-gold'}`}
              >
                Blog
              </Link>
              <button 
                onClick={() => scrollToSection('team')}
                className="text-navy hover:text-gold transition-smooth font-medium"
              >
                Our People
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-navy hover:text-gold transition-smooth font-medium"
              >
                Contact
              </button>
              <Button 
                variant="secondary"
                onClick={() => scrollToSection('contact')}
                className="bg-gold text-navy hover:bg-gold-light"
              >
                Schedule Consultation
              </Button>
            </nav>

            <button className="md:hidden text-navy" aria-label="Open mobile menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-navy text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gold mb-4">CW Mathebula & Associates</h3>
              <p className="text-sm text-muted-foreground">
                Professional legal services tailored to your needs. Serving clients with dedication and expertise.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-gold transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection('practice-areas')} className="hover:text-gold transition-colors">Practice Areas</button></li>
                <li><Link to="/blog" className="hover:text-gold transition-colors">Blog</Link></li>
                <li><button onClick={() => scrollToSection('team')} className="hover:text-gold transition-colors">Our People</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-gold transition-colors">Contact</button></li>
                <li><Link to="/blog/admin" className="hover:text-gold transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gold mb-4">Contact Us</h3>
              <p className="text-sm text-muted-foreground">
                Get in touch with us for a consultation.<br />
                Schedule your appointment today.
              </p>
            </div>
          </div>
          <div className="border-t border-navy-light mt-8 pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} CW Mathebula & Associates. All rights reserved.
          </div>
        </div>
      </footer>

      {isHomePage && <FloatingScrollButton />}
    </div>
  );
}
