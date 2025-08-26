import { Card, CardContent } from "@/components/ui/card";
import wisaniImage from "@/assets/wisani-mathebula.jpg";
import mphoImage from "@/assets/dr-mpho-mokone-mathebula.jpg";
import vuksoiImage from "@/assets/vukosi-nxolwani.jpg";

const teamMembers = [
  {
    name: "Wisani Mathebula",
    role: "Managing Director & Attorney",
    image: wisaniImage,
    description: "As the firm's managing director and founder, Wisani brings strong media and economics background with expertise in litigation, commercial law, and property law. He holds an LLM in Mercantile Law from University of Pretoria.",
    qualifications: ["LLB Degree (UNISA)", "LLM: Mercantile Law (UP)", "Public Relations Diploma", "Financial Journalism Certificate"]
  },
  {
    name: "Dr Mpho Mokone-Mathebula",
    role: "Research Consultant",
    image: mphoImage,
    description: "Dr. Mpho holds a PhD in Psychology from University of the Witwatersrand where she serves as a Lecturer. She leads our legal research and information systems with a focus on social justice and legal innovation.",
    qualifications: ["PhD in Psychology (Wits)", "University Lecturer", "Legal Research Specialist", "Social Justice Advocate"]
  },
  {
    name: "Vukosi Nxolwani",
    role: "Legal Research & Marketing",
    image: vuksoiImage,
    description: "Vukosi is a visual artist and marketing specialist responsible for business development across our Limpopo offices. He combines creative thinking with strategic marketing to grow our client base.",
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
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
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
                      {member.qualifications.map((qual, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1 h-1 bg-gold rounded-full mr-2"></div>
                          {qual}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
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