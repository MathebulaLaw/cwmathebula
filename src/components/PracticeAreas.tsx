import { useQuery } from "@tanstack/react-query";
import { fetchPracticeAreas, PracticeArea } from "@/lib/cms-api";
import { iconMap } from "@/lib/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PracticeAreas = () => {
  const { data: practiceAreas, isLoading } = useQuery({
    queryKey: ['practice_areas'],
    queryFn: fetchPracticeAreas
  });

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
          {isLoading ? (
            Array(12).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full bg-navy-light/50 rounded-xl" />
            ))
          ) : (
            practiceAreas?.map((area: PracticeArea) => {
              const Icon = iconMap[area.icon_name] || iconMap['Scale'];
              return (
                <Card 
                  key={area.id} 
                  className="group hover:shadow-gold transition-all duration-300 hover:-translate-y-2 bg-card border-navy-light hover:border-gold"
                >
                  <CardHeader className="text-center pb-4">
                    <Icon className="w-12 h-12 text-gold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <CardTitle className="text-lg text-foreground">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{area.description}</p>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;