import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PracticeAreas from "@/components/PracticeAreas";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import FloatingScrollButton from "@/components/FloatingScrollButton";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // remove '#'
      // allow a bit of time for content to render, then scroll to element
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <Layout>
      <Hero />
      <About />
      <PracticeAreas />
      <Team />
      <Contact />
    </Layout>
  );
};

export default Index;
