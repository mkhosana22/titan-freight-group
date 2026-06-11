
import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TRUST_BADGES, HERO_IMAGE_URL } from '../constants';

const Hero: React.FC = () => {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden selection:bg-logisticsOrange selection:text-white">
      {/* Background Image: High-quality logistics composite */}
      <div className="absolute inset-0 z-0 bg-[#0B2A4A]">
        <img 
          src={HERO_IMAGE_URL} 
          alt="Logistics Background" 
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          width={1920}
          height={1080}
        />
        {/* Darkened overlay for typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/60 to-transparent"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ willChange: 'transform, opacity' }}
        className="container mx-auto px-6 max-w-6xl relative z-10 flex-grow flex flex-col justify-center"
      >
        <div className="max-w-4xl pt-12">
          {/* Section Tagline */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-5 h-5 bg-logisticsOrange rounded-full flex items-center justify-center p-1">
              <Settings className="text-white w-full h-full animate-spin-slow" />
            </div>
            <span className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.3em] opacity-80">
              Reliable across nationwide
            </span>
          </div>

          {/* Headline: Precise Hierarchy */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
            Bringing Control <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">to Complex logistics</span> <br />
            across South Africa.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed font-medium">
            When delays, uncertainty and unreliable carriers disrupt operations. Titan restores control through structured coordination ensuring your moves consistently, efficiently and without costly disruption every time.
          </p>
          
          {/* Action Buttons: Inspired by "Explore More" Button Style */}
          <div className="flex flex-wrap gap-6 items-center mb-16">
            <Link 
              to="/quote"
              className="group flex items-center bg-white rounded-full pr-1 pl-6 py-1 transition-all hover:pr-2 shadow-2xl"
            >
              <span className="text-navy font-bold uppercase tracking-wider mr-4 py-3">Request a Quote</span>
              <div className="w-12 h-12 bg-logisticsOrange rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-45">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </Link>

            <button 
              onClick={scrollToContact}
              className="text-white font-bold uppercase tracking-widest hover:text-logisticsOrange transition-colors flex items-center gap-3 py-4"
            >
              Book a Consultation
              <div className="w-1.5 h-1.5 bg-logisticsOrange rounded-full"></div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Trust Bridge: Spread across width, horizontally aligned, low friction transition */}
      <div className="relative z-10 w-full bg-white/5 backdrop-blur-sm border-t border-white/10 py-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-wrap justify-between items-center gap-y-8 gap-x-4">
            {TRUST_BADGES.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-4 group flex-1 min-w-[200px] justify-center md:justify-start">
                <div className="text-logisticsOrange transition-transform duration-500 group-hover:scale-110 flex-shrink-0">
                  {/* Fixed TypeScript error by providing a more specific type assertion for the cloned element */}
                  {React.cloneElement(badge.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white group-hover:text-logisticsOrange transition-colors">
                    {badge.label}
                  </span>
                  <div className="h-0.5 w-0 group-hover:w-full bg-logisticsOrange transition-all duration-500 mt-1"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;
