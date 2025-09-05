import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import wisaniImage from "/lovable-uploads/1bf9f468-e2a9-49a3-a0ba-c4b45edf09ea.png";
import mphoImage from "/lovable-uploads/391c430b-9831-4dd5-a1ad-2230f287040b.png";
import vuksoiImage from "/lovable-uploads/3c1ddfd3-14a6-4b8f-b88f-5d5f789fc36e.png";

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
    description: "Vukosi is a visual artist who paints nature and portraits. He is interested in the human condition and human behaviour.",
    extendedBio: "Vukosi is a visual artist who paints nature and portraits. He is interested in the human condition and human behaviour. Vukosi studied for a Visual Arts degree at Tshwane University of Technology and holds a Theology Certificate from the Auckland Park Theological Seminary. He has a Marketing Management certificate from Mopani South East College and is responsible for marketing and business development of the law firm in Limpopo province, covering our Polokwane, Tzaneen and Phalaborwa offices.\n\nWhen not busy with new clients and formulating marketing strategies, Vukosi enjoys exploring nature in the nearby Kruger National Park, running and reading novels. He loves languages and is conversant in all languages spoken in Limpopo province.",
    qualifications: ["Visual Arts Degree (TUT)", "Theology Certificate (Auckland Park Theological Seminary)", "Marketing Management Certificate (Mopani South East College)", "Business Development Specialist", "Multilingual (All Limpopo Languages)"]
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
            <Card key={index} className="group relative overflow-hidden hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 cursor-pointer hover:scale-105">
              <CardContent className="p-6 transition-all duration-500 group-hover:p-8">
                <div className="text-center">
                  <div className="relative mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover object-top shadow-gold transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-gradient-gold opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gold mb-2 group-hover:text-2xl transition-all duration-300">{member.name}</h3>
                  <p className="text-foreground font-semibold mb-4 group-hover:mb-6 transition-all duration-300">{member.role}</p>
                  
                  {/* Short description - always visible */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 group-hover:hidden transition-all duration-300">{member.description}</p>
                  
                  {/* Extended bio - visible on hover */}
                  <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-96 transition-all duration-500 group-hover:mb-6">
                    <div className="text-sm leading-relaxed space-y-3 text-left">
                      {member.extendedBio.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-4 group-hover:pt-6 transition-all duration-300">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Qualifications:</h4>
                    
                    {/* Limited qualifications - visible by default */}
                    <ul className="text-xs text-muted-foreground space-y-1 group-hover:hidden">
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

                    {/* All qualifications - visible on hover */}
                    <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-96 transition-all duration-500">
                      <div className="grid grid-cols-1 gap-2">
                        {member.qualifications.map((qual, idx) => (
                          <div key={idx} className="flex items-center text-xs bg-gold/10 text-foreground px-3 py-2 rounded border border-gold/20">
                            <div className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0"></div>
                            {qual}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Indicator */}
                  <div className="mt-4 opacity-60 group-hover:opacity-0 transition-all duration-300">
                    <div className="bg-gold/10 text-gold text-xs px-3 py-1 rounded-full border border-gold/20">
                      Full bio
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Team Members */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-6">Our Support Team</h3>
          <div className="flex justify-center">
            <Card className="group relative overflow-hidden hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 cursor-pointer hover:scale-105">
              <CardContent className="p-6 transition-all duration-500 group-hover:p-8">
                <div className="text-center">
                  <div className="relative mb-6">
                    <img 
                      src="/lovable-uploads/b66145f2-3dff-46fc-bcbc-2f61f84acabb.png" 
                      alt="Mandy Mkhombo"
                      className="w-32 h-32 rounded-full mx-auto object-cover object-top shadow-gold transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-gradient-gold opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  </div>
                  <h4 className="text-xl font-bold text-gold mb-2 group-hover:text-2xl transition-all duration-300">Trivin Mandy Mkhombo</h4>
                  <p className="text-foreground font-semibold mb-4 group-hover:mb-6 transition-all duration-300">Legal Assistant</p>
                  
                  {/* Short description - always visible */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 group-hover:hidden transition-all duration-300">Legal assistant responsible for document preparation, legal advice, diary management and general office management.</p>
                  
                  {/* Extended bio - visible on hover */}
                  <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-96 transition-all duration-500 group-hover:mb-6">
                    <div className="text-sm leading-relaxed space-y-3 text-left">
                      <p className="text-muted-foreground">
                        Mandy Mkhombo is our legal assistant responsible for document preparation, legal advice, diary management and general office management. She has worked in the aviation industry and is currently studying for her degree in Industrial Psychology.
                      </p>
                      <p className="text-muted-foreground">
                        A bubbly personality with a warm smile, Mandy has a solid foundation in aviation principles alongside a keen understanding of human behaviour, decision-making, and performance. This ensures operational efficiency in our Bryanston, Sandton and Blackheath, Randburg offices, where Mandy works, alternating between the two office spaces depending on the matter at hand.
                      </p>
                      <p className="text-muted-foreground">
                        As a disciplined, detail-oriented, and adaptable individual who is committed to continuous professional growth, Mandy is an asset to our law firm. When she is not busy with clients and legal documents, Mandy enjoys travelling, attending functions with friends, cooking, and playing tennis. As a sports enthusiast, she is happy when watching or participating in sports. She likes driving, and her friends nicknamed her "the female Lewis Hamilton."
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Indicator */}
                  <div className="mt-4 opacity-60 group-hover:opacity-0 transition-all duration-300">
                    <div className="bg-gold/10 text-gold text-xs px-3 py-1 rounded-full border border-gold/20">
                      Full bio
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;