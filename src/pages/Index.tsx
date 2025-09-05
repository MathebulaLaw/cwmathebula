import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PracticeAreas from "@/components/PracticeAreas";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingScrollButton from "@/components/FloatingScrollButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <PracticeAreas />
        <Team />
        <Contact />
      </main>
      <Footer />
      <FloatingScrollButton />
    </div>
  );
};

export default Index;
