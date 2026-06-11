import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS } from '../constants';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(2);
  const [animatingIn, setAnimatingIn] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const prevSlide = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(window.innerWidth < 1024 ? 1 : 2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(TESTIMONIALS.length / cardsPerPage);

  const goTo = (idx: number) => {
    if (idx === activeSlide) return;
    setDirection(idx > activeSlide ? 'right' : 'left');
    setAnimatingIn(false);
    setTimeout(() => {
      prevSlide.current = activeSlide;
      setActiveSlide(idx);
      setAnimatingIn(true);
    }, 50);
  };

  const goNext = () => goTo((activeSlide + 1) % totalPages);
  const goPrev = () => goTo((activeSlide - 1 + totalPages) % totalPages);

  // Change 6 — Auto scroll every 4 seconds
  useEffect(() => {
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [activeSlide, totalPages]);

  const currentCards = TESTIMONIALS.slice(
    activeSlide * cardsPerPage,
    activeSlide * cardsPerPage + cardsPerPage
  );

  return (
    <section className="relative py-24 bg-[#051426] text-white overflow-hidden">
      <style>{`
        @keyframes cardFadeUp {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes cardFadeLeft {
          from { opacity: 0; transform: translateX(40px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes cardFadeRight {
          from { opacity: 0; transform: translateX(-40px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes quoteFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes starPop {
          0%   { transform: scale(0.5); opacity: 0; }
          70%  { transform: scale(1.2); }
          100% { transform: scale(1);   opacity: 1; }
        }

        /* Change 4 — Pulse glow animation */
        @keyframes cardPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(243, 112, 33, 0); }
          50% { box-shadow: 0 0 30px 4px rgba(243, 112, 33, 0.08); }
        }
        .card-pulse {
          animation: cardPulse 3s ease-in-out infinite;
        }

        /* Change 1 — Faster card animations */
        .card-animate-in-right {
          animation: cardFadeLeft 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .card-animate-in-left {
          animation: cardFadeRight 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .card-animate-in-up {
          animation: cardFadeUp 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .card-stagger-1 { animation-delay: 0ms; }

        /* Change 2 — Faster stagger delay */
        .card-stagger-2 { animation-delay: 40ms; }

        /* Change 3 — Faster hover transition */
        .testimonial-card {
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-6px) scale(1.012);
          box-shadow: 0 24px 60px rgba(243, 112, 33, 0.12), 0 0 0 1px rgba(243,112,33,0.15);
          background: rgba(11, 42, 74, 0.75) !important;
        }
        .star-pop {
          animation: starPop 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .quote-float {
          animation: quoteFloat 4s ease-in-out infinite;
        }
        .nav-pill {
          transition: width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                      background 0.25s ease,
                      box-shadow 0.25s ease;
        }
        .arrow-btn {
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }
        .arrow-btn:hover {
          transform: scale(1.1);
          background: rgba(243, 112, 33, 0.15);
          box-shadow: 0 0 20px rgba(243, 112, 33, 0.25);
        }
        .arrow-btn:active {
          transform: scale(0.96);
        }
      `}</style>

      {/* Top stripe */}
      <div
        className="absolute top-0 left-0 w-full h-4 opacity-20 z-10"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-logisticsOrange" />
            <span className="text-gray-400 font-medium tracking-widest text-sm uppercase">Testimonials</span>
            <div className="w-6 h-0.5 bg-logisticsOrange" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Experience Shared by <br />
            <span className="text-logisticsOrange">Our Clients</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className={`grid lg:grid-cols-${cardsPerPage === 2 ? '2' : '1'} gap-8 px-2`}>
          {currentCards.map((t, idx) => (
            <div
              key={`${activeSlide}-${idx}`}
              className={[
                /* Change 5 — Applied card-pulse to every card */
                'testimonial-card card-pulse relative bg-[#0B2A4A]/40 backdrop-blur-md p-10 rounded-[2rem]',
                'border border-white/5 flex flex-col justify-between overflow-hidden min-h-[350px] sm:min-h-[320px] md:min-h-[270px] lg:min-h-[310px] xl:min-h-[260px]',
                animatingIn
                  ? direction === 'right'
                    ? `card-animate-in-right card-stagger-${idx + 1}`
                    : `card-animate-in-left card-stagger-${idx + 1}`
                  : '',
              ].join(' ')}
            >
              {/* Decorative giant quote mark */}
              <span
                className="quote-float absolute -top-2 -left-1 text-[9rem] font-serif leading-none text-logisticsOrange/8 select-none pointer-events-none"
                aria-hidden="true"
              >
                "
              </span>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-logisticsOrange text-logisticsOrange star-pop"
                      style={{ animationDelay: `${i * 55}ms` }}
                    />
                  ))}
                  <span className="ml-2 text-sm font-bold text-gray-300">5.0</span>
                </div>

                {/* Title & Quote */}
                <h3 className="text-xl font-bold mb-4 text-white">
                  {t.title || 'Exceptional Service!'}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-10 text-lg">
                  "{t.quote}"
                </p>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-4 relative z-10">
                <div>
                  <p className="font-bold text-lg text-white">{t.author}</p>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                    {t.position} • {t.company}
                  </p>
                </div>
              </div>

              {/* Bottom glow accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-logisticsOrange/30 to-transparent" />
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 mt-14">
          <button
            onClick={goPrev}
            className="arrow-btn w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`nav-pill h-2 rounded-full ${
                  activeSlide === i
                    ? 'bg-logisticsOrange w-10 shadow-[0_0_16px_rgba(243,112,33,0.55)]'
                    : 'bg-white/10 w-4 hover:bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="arrow-btn w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom stripe */}
      <div
        className="absolute bottom-0 left-0 w-full h-4 opacity-20 z-10"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }}
      />
    </section>
  );
};

export default Testimonials;