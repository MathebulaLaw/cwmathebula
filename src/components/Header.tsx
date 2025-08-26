import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-elegant">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-gold">
            CW Mathebula & Associates
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-primary-foreground hover:text-gold transition-smooth"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('practice-areas')}
              className="text-primary-foreground hover:text-gold transition-smooth"
            >
              Practice Areas
            </button>
            <button 
              onClick={() => scrollToSection('team')}
              className="text-primary-foreground hover:text-gold transition-smooth"
            >
              Our People
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-primary-foreground hover:text-gold transition-smooth"
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

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gold">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;