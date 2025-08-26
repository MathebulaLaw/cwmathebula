import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Gavel, 
  Home, 
  Building2, 
  Shield, 
  FileText, 
  Heart, 
  Users, 
  Calculator, 
  AlertTriangle, 
  HandHeart,
  MapPin,
  Mountain
} from "lucide-react";

const practiceAreas = [
  { icon: Gavel, title: "Litigation", description: "Court representation and dispute resolution" },
  { icon: Home, title: "Property Law", description: "Real estate transactions and property rights" },
  { icon: Building2, title: "Commercial & Corporate Law", description: "Business formation and corporate governance" },
  { icon: Shield, title: "Insurance Law", description: "Insurance claims and coverage disputes" },
  { icon: FileText, title: "Trusts, Wills & Estates", description: "Estate planning and administration" },
  { icon: Heart, title: "Divorce & Family Law", description: "Family matters and relationship disputes" },
  { icon: Users, title: "Employment & Labour Law", description: "Workplace rights and employment disputes" },
  { icon: Calculator, title: "Tax Law", description: "Tax compliance and dispute resolution" },
  { icon: AlertTriangle, title: "Insolvency & Business Rescue", description: "Financial distress and business recovery" },
  { icon: HandHeart, title: "Contract Drafting & Disputes", description: "Agreement preparation and enforcement" },
  { icon: MapPin, title: "Municipal Law", description: "Local government and municipal matters" },
  { icon: Mountain, title: "Mining Rights Law", description: "Mining licenses and mineral rights" }
];

const PracticeAreas = () => {
  return (
    <section id="practice-areas" className="py-20 bg-navy">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Areas of <span className="text-gold">Practice</span>
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive legal services cover a wide range of practice areas to meet all your legal needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {practiceAreas.map((area, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-gold transition-all duration-300 hover:-translate-y-2 bg-card border-navy-light hover:border-gold"
            >
              <CardHeader className="text-center pb-4">
                <area.icon className="w-12 h-12 text-gold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-lg text-foreground">{area.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;