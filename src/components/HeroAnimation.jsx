import { useEffect, useRef } from 'react';
import { initHeroAnimations } from '../animations/HeroAnimationMotion';
import emblem from '../assets/icon/gegs-emblem night.svg';

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
        className="sticky top-0 w-full h-screen bg-charcoal text-alabaster flex flex-col justify-between px-4 sm:px-12 md:px-20 py-6 sm:py-12 select-none overflow-hidden"
      >
        {/* Clean Wave Divider Background */}
        <div 
          className="absolute top-0 left-0 w-full h-12 sm:h-24 z-10 pointer-events-none -mt-[1px]"
          style={{
            background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,40 L1200,0 L0,0 Z' fill='%23FAF6EE'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%'
          }}
        />

        {/* Bright Light Transition Overlay */}
        <div className="flash-overlay absolute inset-0 bg-[#FAF6EE] z-40 opacity-0 will-change-[opacity]" />

        {/* Top Atelier Subheading */}
        <div className="top-subtitle w-full flex justify-center items-center pt-6 sm:pt-8 relative z-20">
          <span className="font-mono text-[10px] sm:text-sm font-extrabold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-amber-400">
            GEGS
          </span>
        </div>

        {/* Center Stage: Layout */}
        <div className="relative w-full flex-1 flex flex-col md:flex-row items-center justify-center md:justify-between max-w-7xl mx-auto px-2 sm:px-4 z-20 gap-2 sm:gap-6 my-auto">
          
          {/* Left Typography */}
          <div className="side-title-left z-10 w-full md:max-w-md text-center md:text-left will-change-[transform,opacity]">
            <h2 className="font-display font-black text-3xl sm:text-6xl md:text-7xl uppercase leading-none tracking-tight text-white drop-shadow-md">
              BESPOKE <br className="hidden md:block" /> TAILORING
            </h2>
          </div>

          {/* Central Emblem & Flowing Petal Badges */}
          <div className="hero-emblem-container relative flex items-center justify-center w-36 h-36 sm:w-72 sm:h-72 md:w-[420px] md:h-[420px] mx-auto z-20 will-change-transform my-1 md:my-0">
            <img
              src={emblem}
              alt="GEGS Emblem"
              className="hero-emblem w-full h-full object-contain drop-shadow-2xl"
            />
            
            {/* Petal Badges positioned at center for GSAP stagger-out */}
            <div className="petal-badge badge-top-left absolute z-30 bg-alabaster text-charcoal px-2 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full font-mono text-[8px] sm:text-xs font-extrabold tracking-wider shadow-[2px_2px_0px_#141413] sm:shadow-[3px_3px_0px_#141413] border-[1.5px] border-charcoal will-change-[transform,opacity] whitespace-nowrap">
              LOOKBOOK
            </div>
            <div className="petal-badge badge-top-right absolute z-30 bg-amber-500 text-charcoal px-2 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full font-mono text-[8px] sm:text-xs font-extrabold tracking-wider shadow-[2px_2px_0px_#141413] sm:shadow-[3px_3px_0px_#ffff] border-[1.5px] border-charcoal will-change-[transform,opacity] whitespace-nowrap">
              11 MILLS
            </div>
            <div className="petal-badge badge-bottom-left absolute z-30 bg-amber-500 text-charcoal px-2 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full font-mono text-[8px] sm:text-xs font-extrabold tracking-wider shadow-[2px_2px_0px_#141413] sm:shadow-[3px_3px_0px_#ffff] border-[1.5px] border-charcoal will-change-[transform,opacity] whitespace-nowrap">
              LAGOS
            </div>
            <div className="petal-badge badge-bottom-right absolute z-30 bg-alabaster text-charcoal px-2 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full font-mono text-[8px] sm:text-xs font-extrabold tracking-wider shadow-[2px_2px_0px_#141413] sm:shadow-[3px_3px_0px_#141413] border-[1.5px] border-charcoal will-change-[transform,opacity] whitespace-nowrap">
              EST. 2024
            </div>
          </div>

          {/* Right Typography */}
          <div className="side-title-right z-10 w-full md:max-w-md text-center md:text-right will-change-[transform,opacity]">
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
        </div>

      </div>
    </div>
  );
}