import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-navy">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Contact <span className="text-gold">Us</span>
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to discuss your legal needs? Get in touch with our experienced team today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Email */}
          <Card className="text-center p-8 bg-card shadow-elegant hover:shadow-gold transition-all duration-300">
            <CardHeader>
              <Mail className="w-12 h-12 text-gold mx-auto mb-4" />
              <CardTitle className="text-gold text-xl">Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <a 
                  href="mailto:wisani@mathebulalaw.co.za"
                  className="block text-foreground hover:text-gold transition-colors"
                >
                  wisani@mathebulalaw.co.za
                </a>
                <a 
                  href="mailto:mpho@mathebulalaw.co.za"
                  className="block text-foreground hover:text-gold transition-colors"
                >
                  mpho@mathebulalaw.co.za
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Phone */}
          <Card className="text-center p-8 bg-card shadow-elegant hover:shadow-gold transition-all duration-300">
            <CardHeader>
              <Phone className="w-12 h-12 text-gold mx-auto mb-4" />
              <CardTitle className="text-gold text-xl">Call Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <a 
                  href="tel:+27769981049"
                  className="block text-foreground hover:text-gold transition-colors text-lg"
                >
                  +27 76 998 1049
                </a>
                <a 
                  href="tel:+27722756235"
                  className="block text-foreground hover:text-gold transition-colors text-lg"
                >
                  +27 72 275 6235
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Locations */}
          <Card className="text-center p-8 bg-card shadow-elegant hover:shadow-gold transition-all duration-300">
            <CardHeader>
              <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
              <CardTitle className="text-gold text-xl">Our Offices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-foreground">
                <div>Johannesburg</div>
                <div>Pretoria</div>
                <div>Polokwane</div>
                <div>Tzaneen</div>
                <div>Phalaborwa</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-primary rounded-lg p-12">
          <h3 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us today to schedule your consultation and discover how we can help solve your legal challenges.
          </p>
          <a href="mailto:wisani@mathebula.co.za">
            <Button 
              size="lg"
              className="bg-gold text-navy hover:bg-gold-light shadow-gold text-lg px-8 py-4"
            >
              Book an Appointment
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;