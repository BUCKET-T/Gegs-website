import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroToggle from './HeroToggle';
import { useGegsIntroAnimations } from '../animations/GegsIntroMotion';
import {
  bespokeVideoStageMotion,
  tiltedReelWallMotion,
  animateIntroStageParallax,
  resetIntroStageParallax,
} from '../animations/GegsIntroVideoMotion';
import heroVideo from '../assets/gegs-hero video-compressed.mp4';

const ATELIER_CARDS = [
  { code: '01 // DRAPE', title: 'HAND-CUT SILHOUETTES', style: 'bg-[#FAF6EE] text-[#141413]' },
  { code: '02 // CRAFT', title: 'BESPOKE COUTURE', style: 'bg-amber-400 text-[#141413]' },
  { code: '03 // STUDIO', title: 'LAGOS & MOWE ATELIER', style: 'bg-blue-600 text-white' },
  { code: '04 // FINISH', title: 'STEAM & TAILORED LAPEL', style: 'bg-emerald-600 text-white' },
];

export default function GegsIntro({
  isBespoke: controlledBespoke,
  onBespokeChange,
}) {
  const {
    containerVariants,
    backgroundSlideUpVariants,
    slideInFromLeft,
    slideInFromRight,
    centerToggleVariants,
  } = useGegsIntroAnimations();

  const [localBespoke, setLocalBespoke] = useState(false);
  const isBespoke = controlledBespoke !== undefined ? controlledBespoke : localBespoke;

  const sectionRef = useRef(null);
  const driftWallRef = useRef(null);
  const videoRef = useRef(null);
  const currentYear = new Date().getFullYear();

  const handleBespokeToggle = (nextVal) => {
    if (onBespokeChange) {
      onBespokeChange(nextVal);
    } else {
      setLocalBespoke(nextVal);
    }
  };

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isBespoke) {
      videoEl.currentTime = 0;
      videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
      resetIntroStageParallax(driftWallRef.current);
    }
  }, [isBespoke]);

  const handlePointerMove = (e) => {
    if (!isBespoke || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    animateIntroStageParallax(driftWallRef.current, nx, ny);
  };

  const handlePointerLeave = () => {
    resetIntroStageParallax(driftWallRef.current);
  };

  return (
    <motion.section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`relative w-full ${
        isBespoke
          ? 'min-h-screen pt-24 sm:pt-28'
          : 'min-h-[calc(100vh-90px)] sm:min-h-[calc(100vh-100px)] pt-6 sm:pt-8'
      } flex flex-col justify-between px-4 sm:px-10 md:px-16 pb-6 sm:pb-8 overflow-hidden select-none transition-[padding] duration-300`}
    >
      {/* ========================================================= */}
      {/* 0. BESPOKE TOGGLE STAGE: TILTED VIDEO & ATELIER WALL      */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isBespoke && (
          <motion.div
            {...bespokeVideoStageMotion}
            aria-hidden="true"
            className="absolute inset-0 z-[5] bg-[#141413] overflow-hidden pointer-events-none"
          >
            <motion.div
              ref={driftWallRef}
              {...tiltedReelWallMotion}
              className="absolute -inset-12 sm:-inset-20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 p-4 will-change-transform"
            >
              {/* Featured Atelier Film Tile */}
              <div className="col-span-2 row-span-2 relative rounded-3xl border-[3px] border-[#FAF6EE]/30 shadow-[8px_8px_0px_#059669] overflow-hidden bg-black min-h-[240px] sm:min-h-[340px]">
                <video
                  ref={videoRef}
                  src={heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-amber-400 text-[#141413] border-2 border-[#141413] font-mono text-[10px] font-extrabold uppercase tracking-[0.18em]">
                  ATELIER FILM // 00:30
                </div>
              </div>

              {/* Surrounding Neo-Brutalist Atelier Cards */}
              {ATELIER_CARDS.map((card) => (
                <div
                  key={card.code}
                  className={`rounded-3xl ${card.style} border-[3px] border-[#141413] shadow-[6px_6px_0px_#2563EB] p-4 sm:p-6 flex flex-col justify-between min-h-[140px] sm:min-h-[175px]`}
                >
                  <span className="font-mono text-[10px] font-extrabold tracking-[0.2em] uppercase opacity-75">
                    {card.code}
                  </span>
                  <span className="font-display font-bold text-xl sm:text-3xl uppercase tracking-tight leading-none">
                    {card.title}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Scrims so navbar, center toggle, and bottom copy stay high-contrast */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#141413]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#141413]/35 via-[#141413]/25 to-[#141413]/75" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 1. DESKTOP VIEW BACKGROUND TYPOGRAPHY */}
      {/* ========================================================= */}
      <div className="hidden sm:block absolute inset-x-0 inset-y-0 pointer-events-none opacity-[0.25] z-0 select-none overflow-hidden">
        <motion.div
          variants={backgroundSlideUpVariants}
          className="absolute inset-0 flex flex-col items-center justify-center -translate-y-8 lg:-translate-y-12 pointer-events-none"
        >
          <h2 className="font-display font-black text-[10vw] tracking-[0.18em] uppercase leading-none text-charcoal text-center">
            Crafting
          </h2>
          <h2 className="font-display font-black text-[10vw] tracking-[0.18em] uppercase leading-none text-blue-600 text-center -mt-5">
            Silhouettes
          </h2>
          <h2 className="font-display font-black text-[8.5vw] tracking-[0.18em] uppercase leading-none text-emerald-600 text-center -mt-5">
            Into Timeless Statements
          </h2>
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* 2. MOBILE VIEW BACKGROUND TYPOGRAPHY (Properly spaced layout) */}
      {/* ========================================================= */}
      <div className="sm:hidden absolute inset-0 pointer-events-none opacity-[0.22] z-0 select-none overflow-hidden px-4 flex flex-col justify-between py-12">
        <motion.div variants={backgroundSlideUpVariants} className="w-full">
          <h2 className="font-display font-black text-[10.5vw] tracking-[0.06em] uppercase leading-none text-charcoal text-left">
            Crafting
          </h2>
        </motion.div>

        <motion.div variants={backgroundSlideUpVariants} className="w-full flex justify-center">
          <h2 className="font-display font-black text-[9.5vw] tracking-[0.06em] uppercase leading-none text-blue-600 text-center">
            Silhouettes
          </h2>
        </motion.div>

        <motion.div variants={backgroundSlideUpVariants} className="w-full flex justify-end">
          <h2 className="font-display font-black text-[8.5vw] tracking-[0.04em] uppercase leading-none text-emerald-600 text-right">
            Into Timeless Statements
          </h2>
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* FOREGROUND CONTENT */}
      {/* ========================================================= */}

      {/* Center Interactive Hero Toggle Section */}
      <motion.div
        variants={centerToggleVariants}
        className="relative z-20 my-auto pt-2 sm:pt-16 flex flex-col items-center justify-center w-full max-w-[280px] sm:max-w-[340px] mx-auto"
      >
        <HeroToggle onToggle={handleBespokeToggle} />
      </motion.div>

      {/* Bottom Footer Details */}
      <div className="relative z-20 w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6 pt-6 sm:pt-8">
        {/* Left: Atelier Philosophy Text (Slides in from left) */}
        <motion.p
          variants={slideInFromLeft}
          className={`font-serif italic text-xs sm:text-base max-w-xs sm:max-w-sm leading-relaxed transition-colors duration-300 ${
            isBespoke ? 'text-[#FAF6EE]' : 'text-charcoal'
          }`}
        >
          Every garment is drawn, draped and fitted by hand, one body at a time, for the woman who wants to be remembered.
        </motion.p>

        {/* Right: Autumn Fitting Status Badge (Slides in from right) */}
        <motion.div
          variants={slideInFromRight}
          className={`flex items-center gap-2 py-1 transition-all duration-300 ${
            isBespoke ? 'bg-[#141413]/85 px-3 rounded-full border border-[#FAF6EE]/20' : 'bg-transparent'
          }`}
        >
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span
            className={`font-mono text-[10px] sm:text-xs font-bold tracking-[0.14em] sm:tracking-[0.16em] uppercase transition-colors duration-300 ${
              isBespoke ? 'text-[#FAF6EE]' : 'text-charcoal'
            }`}
          >
            Accepting Fittings for Autumn {currentYear}
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}