
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LOGO_LIGHT_URL, LOGO_DARK_URL } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Initial check
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Only apply section observer on landing page
    if (location.pathname === '/') {
      const sections = ['home', 'about', 'services', 'testimonials', 'contact'];
      const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Center-based trigger
        threshold: 0,
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        observer.disconnect();
      };
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }

    const sectionId = id.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Header height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white shadow-md shadow-black/5' : 'bg-transparent'
      } py-4`}
    >
      <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
        {/* Left Side: Logo (Responsive & Dynamic Size) */}
        <div className="flex-1">
          <Link 
            to="/" 
            onClick={(e) => { 
              if (location.pathname === '/') {
                e.preventDefault(); 
                scrollToSection('#home'); 
              }
            }}
            className="flex items-center w-fit group relative"
          >
            {/* Light Logo */}
            <img 
              src={LOGO_LIGHT_URL} 
              alt="TFG Logo Light" 
              className={`transition-all duration-300 object-contain hover:scale-105 active:scale-95 h-10 md:h-14 ${
                isScrolled ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
              }`}
              loading="eager"
              decoding="async"
              width={224}
              height={56}
            />
            {/* Dark Logo (Layered on top) */}
            <img 
              src={LOGO_DARK_URL} 
              alt="TFG Logo Dark" 
              className={`absolute top-0 left-0 transition-all duration-300 object-contain hover:scale-105 active:scale-95 h-10 md:h-14 ${
                isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
              }`}
              loading="eager"
              decoding="async"
              width={224}
              height={56}
            />
          </Link>
        </div>

        {/* Center: Desktop Nav Links with Active State & Hover Animations */}
        <nav className="hidden lg:flex items-center justify-center space-x-10 flex-grow">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`relative text-sm font-bold transition-all uppercase tracking-[0.15em] pb-1 group ${
                  isScrolled 
                    ? isActive ? 'text-logisticsOrange' : 'text-navy hover:text-logisticsOrange' 
                    : isActive ? 'text-logisticsOrange' : 'text-white hover:text-logisticsOrange'
                }`}
              >
                {link.name}
                {/* Micro-Interaction: Underline animation */}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-logisticsOrange transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            );
          })}
        </nav>

        {/* Right Side: Primary CTA with Button Effects */}
        <div className="hidden lg:flex items-center justify-end flex-1">
          <Link 
            to="/quote"
            className="bg-logisticsOrange hover:bg-orange-600 text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 transition-transform active:scale-90"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className={isScrolled ? 'text-navy' : 'text-white'} size={28} />
          ) : (
            <Menu className={isScrolled ? 'text-navy' : 'text-white'} size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay with Smooth Animations */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-navy z-[60] flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-300">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={`text-3xl font-black uppercase tracking-widest transition-colors active:scale-95 ${
                activeSection === link.href.replace('#', '') ? 'text-logisticsOrange' : 'text-white hover:text-logisticsOrange'
              }`}
            >
              {link.name}
            </button>
          ))}
          <Link 
            to="/quote"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-logisticsOrange text-white px-12 py-5 rounded-full text-xl font-black uppercase tracking-widest mt-4 shadow-2xl active:scale-95 animate-in slide-in-from-bottom-4 duration-500 delay-150"
          >
            Get a Quote
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2"
          >
            <X size={36} />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
