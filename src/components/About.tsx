import { Card, CardContent } from "@/components/ui/card";
import { Scale, Building, Users, Award } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="text-gold">CW Mathebula & Associates</span>
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              CW Mathebula and Associates Inc. is a full-service commercial law firm headquartered in 
              Bryanston, Sandton — Africa's busiest hub of commerce and industry. We pride ourselves on 
              delivering personalised, practical, and solution-driven legal services across Gauteng and 
              Limpopo provinces.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              With offices in Johannesburg, Pretoria, Phalaborwa, Tzaneen, and Polokwane, we ensure access 
              to quality legal representation across multiple jurisdictions. Our firm is committed to solving 
              both simple and complex legal matters with the highest level of integrity and dedication.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded on the principles of <span className="text-gold font-semibold">Truth, Justice, and Honour</span>, 
              we treat every client as though they are our only client — delivering maximum value, efficiency, and results.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center p-6 shadow-elegant">
              <CardContent className="pt-6">
                <Scale className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Legal Excellence</h3>
                <p className="text-muted-foreground">Committed to the highest standards of legal practice</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 shadow-elegant">
              <CardContent className="pt-6">
                <Building className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Multiple Offices</h3>
                <p className="text-muted-foreground">Strategic locations across Gauteng and Limpopo</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 shadow-elegant">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Client-Focused</h3>
                <p className="text-muted-foreground">Personalised attention for every legal matter</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 shadow-elegant">
              <CardContent className="pt-6">
                <Award className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
                <p className="text-muted-foreground">Track record of successful outcomes</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;