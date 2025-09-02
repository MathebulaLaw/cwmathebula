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
        
        {/* Interactive Icons */}
        <div className="mt-12 flex justify-center items-center gap-16 md:gap-24">
          {/* Practice Areas - Scales */}
          <button
            onClick={() => document.getElementById('practice-areas')?.scrollIntoView({ behavior: 'smooth' })}
            className="group transition-transform duration-300 hover:scale-125 focus:scale-125 focus:outline-none"
            aria-label="Navigate to Practice Areas"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <img 
                src="/lovable-uploads/528eb7af-5635-410a-9317-9baee77f251a.png" 
                alt="Scales of Justice - Practice Areas"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          </button>
          
          {/* Team - Users */}
          <button
            onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
            className="group transition-transform duration-300 hover:scale-125 focus:scale-125 focus:outline-none"
            aria-label="Navigate to Our Team"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <img 
                src="/lovable-uploads/e2bc2a93-d63a-4c78-9e7f-5ec8ff80ef15.png" 
                alt="Team Icon - Our People"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          </button>
          
          {/* About - Shield Check */}
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="group transition-transform duration-300 hover:scale-125 focus:scale-125 focus:outline-none"
            aria-label="Navigate to About"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <img 
                src="/lovable-uploads/a378c7c7-724c-4d47-bc3a-9bf4ed60702b.png" 
                alt="Shield with Checkmark - About Us"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          </button>
          
          {/* Contact - Handshake */}
          <button
            onClick={scrollToContact}
            className="group transition-transform duration-300 hover:scale-125 focus:scale-125 focus:outline-none"
            aria-label="Navigate to Contact"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <img 
                src="/lovable-uploads/82612302-2e4e-4656-b10b-af21c983b35c.png" 
                alt="Handshake - Contact Us"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;