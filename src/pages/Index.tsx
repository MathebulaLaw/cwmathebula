import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PracticeAreas from "@/components/PracticeAreas";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import FloatingScrollButton from "@/components/FloatingScrollButton";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <PracticeAreas />
      <Team />
      <Contact />
      <FloatingScrollButton />
    </Layout>
  );
};

export default Index;
