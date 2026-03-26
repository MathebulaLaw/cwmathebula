import { useState, useEffect } from 'react';
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
  
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    if (!isHomePage) return;

    const sections = ['home', 'about', 'practice-areas', 'team', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Adjust to trigger when section is nicely in view
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for sticky header
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const getNavLinkClass = (sectionId: string) => {
    if (isHomePage) {
      return `transition-smooth ${activeSection === sectionId ? 'text-gold font-bold' : 'text-navy font-normal hover:text-gold'}`;
    }
    return 'transition-smooth text-navy font-normal hover:text-gold';
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
              <button 
                onClick={() => scrollToSection('home')}
                className={getNavLinkClass('home')}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={getNavLinkClass('about')}
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('practice-areas')}
                className={getNavLinkClass('practice-areas')}
              >
                Our Services
              </button>
              <Link 
                to="/blog"
                className={`transition-smooth ${showBlogActive || location.pathname.startsWith('/blog') ? 'text-gold font-bold' : 'text-navy font-normal hover:text-gold'}`}
              >
                Blog
              </Link>
              <button 
                onClick={() => scrollToSection('team')}
                className={getNavLinkClass('team')}
              >
                Our People
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={getNavLinkClass('contact')}
              >
                Contact
              </button>
              <Button 
                variant="secondary"
                onClick={() => scrollToSection('contact')}
                className="bg-gold text-navy font-semibold hover:bg-gold-light"
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
                <li><button onClick={() => scrollToSection('home')} className="hover:text-gold transition-colors font-normal">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-gold transition-colors font-normal">About Us</button></li>
                <li><button onClick={() => scrollToSection('practice-areas')} className="hover:text-gold transition-colors font-normal">Our Services</button></li>
                <li><Link to="/blog" className="hover:text-gold transition-colors font-normal">Blog</Link></li>
                <li><button onClick={() => scrollToSection('team')} className="hover:text-gold transition-colors font-normal">Our People</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-gold transition-colors font-normal">Contact</button></li>
                <li><Link to="/blog/admin" className="hover:text-gold transition-colors font-normal">Login</Link></li>
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

