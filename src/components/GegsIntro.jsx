import { motion } from 'framer-motion';
import HeroToggle from './HeroToggle';
import { useGegsIntroAnimations } from '../animations/GegsIntroMotion';

export default function GegsIntro() {
  const {
    containerVariants,
    backgroundSlideUpVariants,
    slideInFromLeft,
    slideInFromRight,
    centerToggleVariants,
  } = useGegsIntroAnimations();

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative w-full min-h-[calc(100vh-90px)] sm:min-h-[calc(100vh-100px)] flex flex-col justify-between px-4 sm:px-10 md:px-16 py-6 sm:py-8 overflow-hidden select-none"
    >
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
        className="relative z-15 my-auto pt-2 sm:pt-16 flex flex-col items-center justify-center w-full max-w-[280px] sm:max-w-[340px] mx-auto"
      >
        <HeroToggle />
      </motion.div>

      {/* Bottom Footer Details */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6 pt-6 sm:pt-8">
        
        {/* Left: Atelier Philosophy Text (Slides in from left) */}
        <motion.p
          variants={slideInFromLeft}
          className="font-serif italic text-xs sm:text-base max-w-xs sm:max-w-sm text-charcoal leading-relaxed"
        >
          Every garment is drawn, draped and fitted by hand, one body at a time, for the woman who wants to be remembered.
        </motion.p>

        {/* Right: Autumn Fitting Status Badge (Slides in from right) */}
        <motion.div
          variants={slideInFromRight}
          className="flex items-center gap-2 bg-transparent py-1"
        >
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
          <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.14em] sm:tracking-[0.16em] uppercase text-charcoal">
            Accepting Fittings for Autumn 2025
          </span>
        </motion.div>

      </div>
    </motion.section>
  );
}