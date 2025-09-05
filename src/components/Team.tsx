import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import wisaniImage from "/lovable-uploads/1bf9f468-e2a9-49a3-a0ba-c4b45edf09ea.png";
import mphoImage from "/lovable-uploads/391c430b-9831-4dd5-a1ad-2230f287040b.png";
import vuksoiImage from "@/assets/vukosi-nxolwani.jpg";

const teamMembers = [
  {
    name: "Wisani Mathebula",
    role: "Managing Director & Attorney",
    image: wisaniImage,
    description: "As the firm's managing director and founder, Wisani brings strong media and economics background with expertise in litigation, commercial law, and property law.",
    extendedBio: "As the firm's managing director and founder, Wisani is at the heart of CW Mathebula and Associates Inc. Wisani has a strong media and economics background having started out as a radio journalist for the SABC in Polokwane and Auckland Park mostly tasked with African economics stories, before enrolling with UNISA for an LLB Degree.\n\nHis love for knowledge has driven him to acquire degrees and certificates including a Public Relations diploma with Tshwane University of Technology, Financial Journalism certificate with the Gordon Institute of Business Studies, and a Radio Management Certificate with Wits University. He holds an LLM: Mercantile Law degree with University of Pretoria.\n\nWisani served his articles at Snymans Inc., a full spectrum conveyancing law firm before venturing on his own after admission as an attorney of the High Court of South Africa. With his flair for litigation, he has participated and won awards in several moot courts, coupled with his understanding of commercial law and property law.\n\nWith Wisani as your attorney, you are guaranteed full attention and service that seeks to solve your legal issues timeously. The principles of justice, fairness, truth, certainty and finality are key to Wisani's legal philosophy and practice.",
    qualifications: ["LLB Degree (UNISA)", "LLM: Mercantile Law (UP)", "Public Relations Diploma (TUT)", "Financial Journalism Certificate (GIBS)", "Radio Management Certificate (Wits)"]
  },
  {
    name: "Dr Mpho Mokone-Mathebula",
    role: "Research Consultant",
    image: mphoImage,
    description: "Dr. Mpho holds a PhD in Psychology from the University of the Witwatersrand, where she currently serves as a Lecturer with a focus on social justice research.",
    extendedBio: "Dr. Mpho Mokone-Mathebula holds a PhD in Psychology from the University of the Witwatersrand, where she currently serves as a Lecturer in the Department of Psychology. Her research is driven by a deep commitment to social justice, with a particular focus on women's emancipation, naked body protests, decoloniality, child protection, education, and the broader upliftment of society. These themes reflect her passion for addressing pressing social issues and contributing to meaningful change through academic inquiry.\n\nShe has written extensively on these topics and contributes regularly on TV and radio, on issues dealing with the intersectionality of race, gender, law, and economics.\n\nAt CW Mathebula and Associates Inc., Mpho is tasked with legal research and developing the latest legal library and information systems that we always tap on to when diagnosing legal problems and finding a suitable remedy. As a person with a deep love for people, empathetic and kind, Mpho will always make you feel valued as a client and that your legal situation matters.",
    qualifications: ["PhD in Psychology (Wits)", "University Lecturer", "Social Justice Researcher", "Legal Research Specialist", "TV & Radio Contributor"]
  },
  {
    name: "Vukosi Nxolwani",
    role: "Legal Research & Marketing",
    image: vuksoiImage,
    description: "Vukosi is a visual artist and marketing specialist responsible for business development across our Limpopo offices.",
    extendedBio: "Vukosi is a visual artist and marketing specialist responsible for business development across our Limpopo offices. He combines creative thinking with strategic marketing to grow our client base. His unique background in visual arts brings a fresh perspective to legal marketing and client communication, helping to bridge the gap between complex legal concepts and client understanding.",
    qualifications: ["Visual Arts Degree (TUT)", "Theology Certificate", "Marketing Management Certificate", "Business Development"]
  }
];

const Team = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <HoverCard key={index} openDelay={300} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Card className="group relative overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="relative mb-6">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-32 h-32 rounded-full mx-auto object-cover shadow-gold"
                        />
                        <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-gradient-gold opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </div>
                      <h3 className="text-xl font-bold text-gold mb-2">{member.name}</h3>
                      <p className="text-foreground font-semibold mb-4">{member.role}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{member.description}</p>
                      
                      <div className="border-t border-border pt-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Key Qualifications:</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {member.qualifications.slice(0, 3).map((qual, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className="w-1 h-1 bg-gold rounded-full mr-2"></div>
                              {qual}
                            </li>
                          ))}
                          {member.qualifications.length > 3 && (
                            <li className="text-gold/80 text-xs italic">+{member.qualifications.length - 3} more qualifications</li>
                          )}
                        </ul>
                      </div>
                      
                      {/* Hover Indicator */}
                      <div className="mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-gold/10 text-gold text-xs px-3 py-1 rounded-full border border-gold/20">
                          Hover for full biography
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              
              <HoverCardContent 
                className="w-96 max-w-[90vw] max-h-[80vh] overflow-y-auto bg-gradient-to-br from-navy/95 to-navy/85 backdrop-blur-lg border-gold/20 text-white p-6"
                side="top"
                align="center"
              >
                <div className="text-center">
                  <div className="relative mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-gold"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gold mb-1">{member.name}</h3>
                  <p className="text-gold/80 font-medium mb-6">{member.role}</p>
                  
                  <div className="text-left space-y-4">
                    <div className="text-sm leading-relaxed space-y-3">
                      {member.extendedBio.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="text-white/90">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gold/30">
                      <p className="text-sm font-semibold text-gold mb-3">All Qualifications & Expertise:</p>
                      <div className="grid grid-cols-1 gap-2">
                        {member.qualifications.map((qual, idx) => (
                          <div key={idx} className="flex items-center text-sm bg-gold/10 text-white px-3 py-2 rounded border border-gold/20">
                            <div className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0"></div>
                            {qual}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>

        {/* Additional Team Members */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-6">Our Support Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-gold mb-2">Trivin Mkhombo</h4>
              <p className="text-foreground font-medium">Legal Assistant</p>
            </Card>
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-gold mb-2">Xichavo Ndlovu</h4>
              <p className="text-foreground font-medium">Legal Assistant</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;