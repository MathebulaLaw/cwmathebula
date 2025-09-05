import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';

const FloatingScrollButton = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: 'hero', element: null },
    { id: 'about', element: null },
    { id: 'practice-areas', element: null },
    { id: 'team', element: null },
    { id: 'contact', element: null }
  ];

  useEffect(() => {
    // Show button when user scrolls past hero section
    const handleScroll = () => {
      const scrolled = window.scrollY > window.innerHeight * 0.3;
      setIsVisible(scrolled);
    };

    // Intersection Observer to detect current section
    const observerOptions = {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const sectionIndex = sections.findIndex(s => s.id === sectionId);
          if (sectionIndex !== -1) {
            setCurrentSection(sectionIndex);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      const element = section.id === 'hero' 
        ? document.querySelector('main > section:first-child') 
        : document.getElementById(section.id);
      
      if (element) {
        observer.observe(element);
      }
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToNextSection = () => {
    const isAtEnd = currentSection >= sections.length - 1;
    
    if (isAtEnd) {
      // Scroll back to hero section
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Scroll to next section
      const nextSectionId = sections[currentSection + 1].id;
      const element = document.getElementById(nextSectionId);
      
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const isAtEnd = currentSection >= sections.length - 1;

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToNextSection}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-gradient-gold hover:shadow-gold transition-all duration-300 hover:scale-110 group border-2 border-gold-primary/20"
      aria-label={isAtEnd ? "Scroll to top" : "Scroll to next section"}
    >
      <div className="transition-transform duration-300 group-hover:scale-110">
        {isAtEnd ? (
          <ChevronUp className="w-6 h-6 text-navy-dark" />
        ) : (
          <ChevronDown className="w-6 h-6 text-navy-dark" />
        )}
      </div>
    </Button>
  );
};

export default FloatingScrollButton;