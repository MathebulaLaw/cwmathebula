import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-elegant">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/528eb7af-5635-410a-9317-9baee77f251a.png" 
              alt="CW Mathebula & Associates" 
              className="h-40 w-auto filter drop-shadow-sm" 
            />
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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

          {/* Mobile Menu Button */}
          <button className="md:hidden text-navy">
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