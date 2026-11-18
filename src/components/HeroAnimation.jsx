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
    <div ref={containerRef} className="relative z-50 w-full h-[350vh] sm:h-[400vh] bg-blue-600">
      <div
        ref={sectionRef}
        className="sticky top-0 w-full h-screen bg-blue-600 text-alabaster flex flex-col justify-between px-4 sm:px-12 md:px-20 py-6 sm:py-12 select-none overflow-hidden"
      >
        {/* Wavy Top Divider SVG (Fixed seam line with -translate-y-[1px]) */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none -translate-y-[1px]">
          <svg
            className="relative block w-full h-10 sm:h-20 text-[#FAF6EE]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,40 L1200,0 L0,0 Z"
              fill="#FAF6EE"
            ></path>
          </svg>
        </div>

        {/* Bright Light Transition Overlay */}
        <div className="flash-overlay absolute inset-0 bg-[#FAF6EE] z-40 opacity-0 will-change-[opacity]" />

        {/* Top Atelier Subheading */}
        <div className="top-subtitle w-full flex justify-center items-center pt-3 sm:pt-4 relative z-20">
          <span className="font-mono text-[10px] sm:text-sm font-extrabold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-amber-400">
            THE ATELIER
          </span>
        </div>

        {/* Center Stage: Optimized Mobile Stack vs Desktop Row */}
        <div className="relative w-full flex-1 flex flex-col md:flex-row items-center justify-center md:justify-between max-w-7xl mx-auto px-2 sm:px-4 z-20 gap-2 sm:gap-6 my-auto">
          
          {/* Left Typography */}
          <div className="side-title-left z-10 w-full md:max-w-xs text-center md:text-left will-change-[transform,opacity]">
            <h2 className="font-display font-black text-3xl sm:text-6xl md:text-7xl uppercase leading-none tracking-tight text-white drop-shadow-md">
              BESPOKE <br className="hidden md:block" /> TAILORING
            </h2>
          </div>

          {/* Central Emblem & Interactive Petal Badges */}
          <div className="hero-emblem-container relative flex items-center justify-center w-36 h-36 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto z-20 will-change-transform my-1 md:my-0">
            <img
              src={emblem}
              alt="GEGS Emblem"
              className="hero-emblem w-full h-full object-contain drop-shadow-2xl"
            />
            
            {/* Petal Badges */}
            <div className="petal-badge absolute -top-1 -left-3 sm:-top-4 sm:-left-8 bg-alabaster text-charcoal px-2 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full font-mono text-[8px] sm:text-xs font-extrabold tracking-wider shadow-[2px_2px_0px_#141413] sm:shadow-[3px_3px_0px_#141413] border-[1.5px] border-charcoal will-change-[transform,opacity]">
              LOOKBOOK
            </div>
            <div className="petal-badge absolute -top-1 -right-2 sm:-top-4 sm:-right-6 bg-amber-500 text-charcoal px-2 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full font-mono text-[8px] sm:text-xs font-extrabold tracking-wider shadow-[2px_2px_0px_#141413] sm:shadow-[3px_3px_0px_#141413] border-[1.5px] border-charcoal will-change-[transform,opacity]">
              11 MILLS
            </div>
            <div className="petal-badge absolute -bottom-1 -left-2 sm:-bottom-2 sm:-left-6 bg-amber-500 text-charcoal px-2 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full font-mono text-[8px] sm:text-xs font-extrabold tracking-wider shadow-[2px_2px_0px_#141413] sm:shadow-[3px_3px_0px_#141413] border-[1.5px] border-charcoal will-change-[transform,opacity]">
              LAGOS
            </div>
            <div className="petal-badge absolute -bottom-1 -right-3 sm:-bottom-2 sm:-right-8 bg-alabaster text-charcoal px-2 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full font-mono text-[8px] sm:text-xs font-extrabold tracking-wider shadow-[2px_2px_0px_#141413] sm:shadow-[3px_3px_0px_#141413] border-[1.5px] border-charcoal will-change-[transform,opacity]">
              EST. 2025
            </div>
          </div>

          {/* Right Typography */}
          <div className="side-title-right z-10 w-full md:max-w-xs text-center md:text-right will-change-[transform,opacity]">
            <h2 className="font-display font-black text-3xl sm:text-6xl md:text-7xl uppercase leading-none tracking-tight text-white drop-shadow-md">
              ARTISANAL <br className="hidden md:block" /> TEXTILES
            </h2>
          </div>

        </div>

        {/* Bottom Footer Quote & CTA */}
        <div className="hero-footer w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 pb-2 sm:pb-4 border-t-[2px] border-white/20 pt-3 sm:pt-6 relative z-20 will-change-[opacity]">
          <p className="font-serif italic text-xs sm:text-base text-alabaster/90 max-w-xs sm:max-w-md text-center sm:text-left">
            Silk, wool and hand-dyed linen, sourced from eleven mills and cut in a single studio on Lagos Island.
          </p>

          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center">
            <button
              type="button"
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-alabaster text-charcoal font-mono text-[11px] sm:text-xs font-extrabold tracking-[0.16em] uppercase border-[2px] border-charcoal shadow-[3px_3px_0px_#141413] sm:shadow-[4px_4px_0px_#141413] cursor-pointer"
            >
              VIEW LOOKBOOK
            </button>
            <button
              type="button"
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-amber-500 text-charcoal font-mono text-[11px] sm:text-xs font-extrabold tracking-[0.16em] uppercase border-[2px] border-charcoal shadow-[3px_3px_0px_#141413] sm:shadow-[4px_4px_0px_#141413] cursor-pointer"
            >
              CONTACT
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}