import { Button } from "@/components/ui/button";
import heroImage from "@/assets/law-office-hero.jpg";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-navy opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gold mb-6">
          Truth. Justice. Honour.
        </h1>
        <h2 className="text-xl md:text-2xl text-primary-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
          A full-service commercial law firm based in Bryanston, Sandton — serving Gauteng and Limpopo with integrity and dedication.
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            onClick={scrollToContact}
            className="bg-gold text-navy hover:bg-gold-light shadow-gold text-lg px-8 py-4"
          >
            Schedule a Consultation
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-gold text-gold hover:bg-gold hover:text-navy text-lg px-8 py-4"
          >
            Learn More
          </Button>
        </div>
        
        {/* Key Points */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">5</div>
            <div className="text-primary-foreground">Office Locations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">Full Service</div>
            <div className="text-primary-foreground">Commercial Law Firm</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">Expert</div>
            <div className="text-primary-foreground">Legal Representation</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;