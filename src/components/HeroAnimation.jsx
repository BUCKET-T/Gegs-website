import { useEffect, useRef } from 'react';
import { initHeroAnimations } from '../animations/HeroAnimationMotion';
import emblem from '../assets/icon/gegs-emblem.svg';

export default function HeroAnimation() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const cleanup = initHeroAnimations(containerRef, sectionRef);
    return cleanup;
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-alabaster">
      <section
        ref={sectionRef}
        className="relative w-full h-full bg-blue-600 text-alabaster flex flex-col justify-between px-6 sm:px-12 md:px-20 py-12 select-none overflow-hidden"
      >
        {/* Top Gegs Subheading */}
        <div className="w-full flex justify-center items-center pt-2">
          <span className="font-mono text-xs sm:text-sm font-extrabold tracking-[0.3em] uppercase text-amber-400">
            GEGS
          </span>
        </div>

        {/* Center Stage: Side Typography & Central Emblem */}
        <div className="relative w-full flex-1 flex items-center justify-between max-w-7xl mx-auto my-auto px-4">
          
          {/* Left Typography */}
          <div className="side-title-left z-10 max-w-xs">
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase leading-none tracking-tight text-white drop-shadow-md">
              BESPOKE <br /> TAILORING
            </h2>
          </div>

          {/* Central Rotating Emblem & Petal Badges */}
          <div className="hero-emblem-container relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80 mx-auto">
            <img
              src={emblem}
              alt="GEGS Rosette Emblem"
              className="hero-emblem w-full h-full object-contain drop-shadow-2xl"
            />
            
            {/* Interactive Scroll Petal Badges */}
            <div className="petal-badge absolute -top-4 -left-6 bg-alabaster text-charcoal px-3 py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold tracking-wider shadow-[3px_3px_0px_#141413] border-[1.5px] border-charcoal">
              LAGOS ISLAND
            </div>
            <div className="petal-badge absolute -bottom-2 -right-6 bg-amber-500 text-charcoal px-3 py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold tracking-wider shadow-[3px_3px_0px_#141413] border-[1.5px] border-charcoal">
              11 MILLS
            </div>
          </div>

          {/* Right Typography */}
          <div className="side-title-right z-10 max-w-xs text-right">
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase leading-none tracking-tight text-white drop-shadow-md">
              ARTISANAL <br /> TEXTILES
            </h2>
          </div>

        </div>

        {/* Bottom Footer Quote & CTA */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 pb-4 border-t-[2px] border-white/20 pt-6">
          <p className="font-serif italic text-sm sm:text-base text-alabaster/90 max-w-md text-center sm:text-left">
            Silk, wool and hand-dyed linen, sourced from eleven mills and cut in a single studio on Lagos Island.
          </p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="px-6 py-3 rounded-full bg-alabaster text-charcoal font-mono text-xs font-extrabold tracking-[0.16em] uppercase border-[2px] border-charcoal shadow-[4px_4px_0px_#141413] hover:translate-y-[-2px] transition-transform cursor-pointer"
            >
              VIEW LOOKBOOK
            </button>
            <button
              type="button"
              className="px-6 py-3 rounded-full bg-amber-500 text-charcoal font-mono text-xs font-extrabold tracking-[0.16em] uppercase border-[2px] border-charcoal shadow-[4px_4px_0px_#141413] hover:translate-y-[-2px] transition-transform cursor-pointer"
            >
              CONTACT GEGS
            </button>
          </div>
        </div>

      </section>
    </div>
  );
}