import React, { useState } from 'react';
import { FAQS } from '../constants';
import { Plus, Minus, MessageCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(1); // Default active item per image inspiration

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white selection:bg-logisticsOrange selection:text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-logisticsOrange"></div>
            <span className="text-navy font-bold tracking-widest text-sm uppercase">FAQs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-navy">
            Question? <span className="text-logisticsOrange">Look here.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          
          {/* FAQ Accordion List */}
          <div className="lg:col-span-2 space-y-4">
            {FAQS.map((faq, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`rounded-2xl transition-all duration-100 overflow-hidden ${
                    isActive 
                      ? 'bg-navy text-white shadow-xl' 
                      : 'bg-white text-navy border border-industrialGrey hover:border-steelBlue'
                  }`}
                >
                  <button 
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left group"
                  >
                    <span className={`text-lg md:text-xl font-bold transition-colors ${isActive ? 'text-white' : 'text-navy group-hover:text-steelBlue'}`}>
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 ml-4 p-1 rounded-full transition-transform ${isActive ? 'bg-white/10 rotate-180' : 'bg-industrialGrey'}`}>
                      {isActive ? (
                        <Minus className="w-5 h-5 text-white" />
                      ) : (
                        <Plus className="w-5 h-5 text-navy" />
                      )}
                    </div>
                  </button>
                  
                  {isActive && (
                    <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-100">
                      <div className="w-full h-px bg-white/10 mb-6"></div>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sidebar Contact Card */}
          <div className="space-y-6">
            {/* Navy Card: Have different questions? */}
            <div className="bg-navy rounded-3xl p-8 md:p-10 text-white text-center relative overflow-hidden group shadow-2xl">
              {/* Decorative stripes background */}
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 11px)' }}></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full transition-transform group-hover:scale-125 duration-700"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 shadow-inner ring-1 ring-white/20">
                  <MessageCircle className="w-8 h-8 text-logisticsOrange" />
                </div>
                <h3 className="text-2xl font-black mb-3 leading-tight px-4">You have different questions?</h3>
                <p className="text-gray-400 mb-8 leading-relaxed text-sm font-medium">
                  Our team is ready to provide precise answers and clear logistics assurance.
                </p>
                <button 
                   onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                   className="w-full bg-logisticsOrange hover:bg-orange-600 text-white font-bold uppercase tracking-wider py-4 rounded-xl transition-all shadow-lg active:scale-95 text-sm"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;