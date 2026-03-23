import { useQuery } from "@tanstack/react-query";
import { fetchTeamMembers, TeamMember } from "@/lib/cms-api";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Team = () => {
  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ['team_members'],
    queryFn: () => fetchTeamMembers(false) // main team
  });

  const { data: supportTeam, isLoading: isSupportLoading } = useQuery({
    queryKey: ['support_team'],
    queryFn: () => fetchTeamMembers(true)
  });

  const renderMemberSkeleton = () => (
    <Card className="group relative overflow-hidden">
      <CardContent className="p-6">
        <div className="text-center">
          <Skeleton className="w-32 h-32 rounded-full mx-auto mb-6" />
          <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-20 w-full mb-4" />
        </div>
      </CardContent>
    </Card>
  );

  const renderMember = (member: TeamMember) => (
    <Card key={member.id} className="group relative overflow-hidden hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 cursor-pointer hover:scale-105 bg-card">
      <CardContent className="p-6 transition-all duration-500 group-hover:p-8">
        <div className="text-center">
          <div className="relative mb-6">
            <img 
              src={member.image_url || '/placeholder.svg'} 
              alt={member.name}
              loading="lazy"
              className="w-32 h-32 rounded-full mx-auto object-cover object-top shadow-gold transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-gradient-gold opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          </div>
          <h3 className="text-xl font-bold text-gold mb-2 group-hover:text-2xl transition-all duration-300">{member.name}</h3>
          <p className="text-foreground font-semibold mb-4 group-hover:mb-6 transition-all duration-300">{member.role}</p>
          
          {/* Short description - always visible */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 group-hover:hidden transition-all duration-300">{member.short_description}</p>
          
          {/* Extended bio - visible on hover */}
          <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-96 transition-all duration-500 group-hover:mb-6">
            <div className="text-sm leading-relaxed space-y-3 text-left">
              {member.extended_bio.split('\n\n').map((paragraph: string, idx: number) => (
                <p key={idx} className="text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          {member.qualifications && member.qualifications.length > 0 && (
            <div className="border-t border-border pt-4 group-hover:pt-6 transition-all duration-300">
              <h4 className="text-sm font-semibold text-foreground mb-2">Key Qualifications:</h4>
              
              {/* Limited qualifications - visible by default */}
              <ul className="text-xs text-muted-foreground space-y-1 group-hover:hidden">
                {member.qualifications.slice(0, 3).map((qual) => (
                  <li key={qual} className="flex items-center">
                    <div className="w-1 h-1 bg-gold rounded-full mr-2 flex-shrink-0"></div>
                    <span className="text-left">{qual}</span>
                  </li>
                ))}
                {member.qualifications.length > 3 && (
                  <li className="text-gold/80 text-xs italic">+{member.qualifications.length - 3} more qualifications</li>
                )}
              </ul>

              {/* All qualifications - visible on hover */}
              <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-96 transition-all duration-500">
                <div className="grid grid-cols-1 gap-2">
                  {member.qualifications.map((qual) => (
                    <div key={qual} className="flex items-center text-xs bg-gold/10 text-foreground px-3 py-2 rounded border border-gold/20 text-left">
                      <div className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0"></div>
                      {qual}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Hover Indicator */}
          <div className="mt-4 opacity-60 group-hover:opacity-0 transition-all duration-300">
            <div className="bg-gold/10 text-gold text-xs px-3 py-1 rounded-full border border-gold/20 inline-block">
              Full bio
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-gold">People</span>
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Meet our experienced team of legal professionals dedicated to delivering exceptional service and results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            <>
              {renderMemberSkeleton()}
              {renderMemberSkeleton()}
              {renderMemberSkeleton()}
            </>
          ) : (
            teamMembers?.map(renderMember)
          )}
        </div>

        {/* Additional Team Members */}
        {(!isSupportLoading && supportTeam && supportTeam.length > 0) && (
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-6">Our Support Team</h3>
            <div className="flex justify-center flex-wrap gap-8">
              {supportTeam.map(renderMember)}
            </div>
          </div>
        )}
        {isSupportLoading && (
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-6">Our Support Team</h3>
            <div className="flex justify-center">
              {renderMemberSkeleton()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;