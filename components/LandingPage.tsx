
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Stats from './Stats';
import Services from './Services';
import Testimonials from './Testimonials';
import ContactForm from './ContactForm';
import Blog from './Blog';
import FAQ from './FAQ';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle scroll to section if state exists
    const state = location.state as { scrollTo?: string };
    if (state?.scrollTo) {
      const id = state.scrollTo.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#0B2A4A] selection:bg-logisticsOrange selection:text-white">
      <Header />
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="about">
          <About />
          <Stats />
        </section>
        
        <section id="services">
          <Services />
        </section>
        
        <section id="testimonials">
          <Testimonials />
        </section>
        
        <section id="contact">
          <ContactForm />
        </section>
        
        <section id="blog">
          <Blog />
        </section>

        <section id="faq">
          <FAQ />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
