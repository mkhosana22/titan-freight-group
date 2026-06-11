
import React from 'react';
import { STATS } from '../constants';

const Stats: React.FC = () => {
  return (
    <section className="bg-industrialGrey py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <p className="text-4xl md:text-5xl font-black text-navy mb-2 group-hover:text-steelBlue transition-colors">
                {stat.value}
              </p>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
