import React, { useState, useRef, useEffect } from 'react';
import { SERVICES } from '../constants';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const Services: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Responsive cards
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🔥 FAST CUSTOM SCROLL (0.4s)
  useEffect(() => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const containerWidth = container.offsetWidth;
    const cardWidth = containerWidth / visibleCards;
    const target = currentIndex * cardWidth;

    const duration = 400;
    const start = container.scrollLeft;
    const startTime = performance.now();
    let rId = 0;

    const animateScroll = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      container.scrollLeft = start + (target - start) * ease;

      if (progress < 1) {
        rId = requestAnimationFrame(animateScroll);
      }
    };

    rId = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(rId);
    };
  }, [currentIndex, visibleCards]);

  const nextSlide = () => {
    if (isAnimating) return;
    if (currentIndex < SERVICES.length - visibleCards) {
      setIsAnimating(true);
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 400);
    }
  };

  const prevSlide = () => {
    if (isAnimating) return;
    if (currentIndex > 0) {
      setIsAnimating(true);
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 400);
    }
  };

  const totalSteps = SERVICES.length - (visibleCards - 1);
  const progress = ((currentIndex + 1) / totalSteps) * 100;

  return (
    <section className="py-24 bg-white overflow-hidden selection:bg-logisticsOrange selection:text-white">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-navy leading-tight tracking-tight">
            Welcome To Logistics.
          </h2>
          <h3 className="text-xl md:text-3xl font-bold text-steelBlue opacity-90">
            Master Your Retail Supply Chain with Expert Logistics
          </h3>
        </div>

        {/* SLIDER */}
        <div className="relative max-w-6xl mx-auto">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden no-scrollbar pb-10 px-2"
          >
            {SERVICES.map((service, idx) => {
              const isActive =
                idx >= currentIndex && idx < currentIndex + visibleCards;

              return (
                <div
                  key={idx}
                  className={`flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]
                  transition-all duration-700 ease-out
                  ${isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-6'}
                  `}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-[0_20px_50px_rgba(11,42,74,0.3)]">

                    {/* IMAGE */}
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={500}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"></div>

                    {/* BUTTON */}
                    <div className="absolute top-8 right-8 z-20">
                      <button className="w-14 h-14 bg-logisticsOrange rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95">
                        <ArrowUpRight className="w-7 h-7" />
                      </button>
                    </div>

                    {/* TEXT */}
                    <div className="absolute bottom-12 left-10 right-10 z-10">
                      <h4 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">
                        {service.title}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CONTROLS */}
          <div className="flex items-center justify-center mt-12 gap-8">

            {/* PREV */}
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center transition-all shadow-sm bg-white ${
                currentIndex === 0
                  ? 'opacity-30 cursor-not-allowed scale-90'
                  : 'hover:bg-navy hover:text-white hover:border-navy hover:shadow-lg'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* PROGRESS */}
            <div className="w-64 md:w-96">
              <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-logisticsOrange transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* DOTS */}
              <div className="flex justify-center gap-3 mt-6">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === i
                        ? 'bg-logisticsOrange w-8'
                        : 'bg-gray-200 w-2 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* NEXT */}
            <button
              onClick={nextSlide}
              disabled={currentIndex >= SERVICES.length - visibleCards}
              className={`w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center transition-all shadow-sm bg-white ${
                currentIndex >= SERVICES.length - visibleCards
                  ? 'opacity-30 cursor-not-allowed scale-90'
                  : 'hover:bg-navy hover:text-white hover:border-navy hover:shadow-lg'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-20 opacity-30">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-navy">
            Ecosystem Coordination • Titan Freight Group
          </span>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Services;
