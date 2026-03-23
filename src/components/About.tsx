import { useQuery } from "@tanstack/react-query";
import { fetchSiteContent } from "@/lib/cms-api";
import { iconMap } from "@/lib/icons";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const About = () => {
  const { data: aboutContent, isLoading } = useQuery({
    queryKey: ['site_content', 'about'],
    queryFn: () => fetchSiteContent('about')
  });

  if (isLoading || !aboutContent) {
    return (
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-3/4 max-w-lg mx-auto mb-6" />
            <Skeleton className="h-1 w-24 mx-auto mb-8" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-40 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            {aboutContent.main_paragraphs?.map((para: string, idx: number) => (
              <p key={idx} className="text-lg text-muted-foreground leading-relaxed mb-6 last:mb-0">
                {para.includes("Truth, Justice, and Honour") ? (
                  <>
                    Founded on the principles of <span className="text-gold font-semibold">Truth, Justice, and Honour</span>, 
                    we treat every client as though they are our only client — delivering maximum value, efficiency, and results.
                  </>
                ) : (
                  para
                )}
              </p>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {aboutContent.highlights?.map((highlight: any, idx: number) => {
              const Icon = iconMap[highlight.icon] || iconMap['Award'];
              return (
                <Card key={idx} className="text-center p-6 shadow-elegant">
                  <CardContent className="pt-6">
                    <Icon className="w-12 h-12 text-gold mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;