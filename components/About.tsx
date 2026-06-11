
import React from 'react';
import { motion } from 'motion/react';
import { Shield, Target, Users, BarChart } from 'lucide-react';
import { ABOUT_IMAGE_URL } from '../constants';

const About: React.FC = () => {
  const points = [
    { icon: <Target className="w-5 h-5" />, text: "End-to-end coordination" },
    { icon: <Shield className="w-5 h-5" />, text: "Risk management & mitigation" },
    { icon: <BarChart className="w-5 h-5" />, text: "Compliance & regulatory handling" },
    { icon: <Users className="w-5 h-5" />, text: "Real human decision-making" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ willChange: 'transform, opacity' }}
        className="container mx-auto px-6 max-w-6xl"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src={ABOUT_IMAGE_URL} 
              alt="DUSS Umschlagbahnhof DB terminal at sunset" 
              className="rounded-lg shadow-xl w-full h-auto aspect-[3/2] object-cover bg-gray-100"
              loading="lazy"
              decoding="async"
              width={600}
              height={400}
            />
            <div className="absolute -bottom-10 -right-10 bg-navy p-10 rounded-lg text-white hidden md:block max-w-xs shadow-2xl">
              {/* Corrected "Since 2026" to "Since 2016" to maintain consistency with historical claims in testimonials */}
              <p className="text-2xl font-bold mb-2">Since 2016</p>
              <p className="text-gray-400 text-sm italic">"Setting the gold standard for Southern African logistics assurance."</p>
            </div>
          </div>

          <div>
            <span className="text-logisticsOrange font-bold uppercase tracking-widest text-sm mb-4 block">Our Commitment</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-navy mb-8 leading-tight">
              Your Freight. <br />
              <span className="text-steelBlue">Our Responsibility.</span>
            </h2>
            <div className="space-y-6 text-charcoalGrey mb-10 text-lg leading-relaxed">
              <p>
                At Titan Freight Group, we don't just move freight - we take control of it. In an industry challenged by delays, poor communication and unreliable capacity, we act as your single point of accountability.
              </p>
              <p>
                Every shipment is managed with discipline, structure and full visibility. By coordinating trusted carries, we ensure consistent, efficient delivery from origin to final desination without compromise.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="text-logisticsOrange">
                    {point.icon}
                  </div>
                  <span className="font-semibold text-navy">{point.text}</span>
                </div>
              ))}
            </div>

            <button className="bg-navy hover:bg-steelBlue text-white px-8 py-4 rounded font-bold uppercase tracking-wide transition-all shadow-md">
              Discover More
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
