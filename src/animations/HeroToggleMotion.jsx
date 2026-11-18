import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroToggleMotion({ onToggle }) {
  const [isBespoke, setIsBespoke] = useState(false);

  const handleToggle = () => {
    const nextState = !isBespoke;
    setIsBespoke(nextState);
    if (onToggle) onToggle(nextState);
  };

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-0">
      {/* Outer Pill Shell */}
      <motion.button
        type="button"
        onClick={handleToggle}
        role="switch"
        aria-checked={isBespoke}
        aria-label="Toggle between Bespoke and Ready-to-Wear collections"
        whileHover={{ y: -2, boxShadow: '8px 8px 0px #141413' }}
        whileTap={{ x: 3, y: 3, boxShadow: '3px 3px 0px #141413' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="relative w-full max-w-[390px] sm:max-w-[480px] h-[112px] sm:h-[126px] rounded-full bg-alabaster border-[2.5px] border-charcoal shadow-[6px_6px_0px_#141413] p-1 cursor-pointer focus:outline-none"
      >
        {/* Inner Colored Track */}
        <motion.div
          animate={{
            backgroundColor: isBespoke ? '#059669' : '#2563EB',
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`relative w-full h-full rounded-full border-0 flex items-center overflow-hidden ${
            isBespoke ? 'justify-end' : 'justify-start'
          }`}
        >
          {/* Subtle Glass Highlight */}
          <div className="pointer-events-none absolute inset-x-6 top-1 h-3 rounded-full bg-white/15 blur-[1px]" />

          {/* Track Labels */}
          <div className="absolute inset-0 flex justify-between items-center px-14 sm:px-20 font-mono text-[11px] sm:text-sm font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase pointer-events-none z-0">
            <motion.span
              animate={{
                opacity: isBespoke ? 1 : 0,
                x: isBespoke ? 0 : -8,
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="text-white"
            >
              BESPOKE
            </motion.span>

            <motion.span
              animate={{
                opacity: isBespoke ? 0 : 1,
                x: isBespoke ? 8 : 0,
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="text-white"
            >
              READY-TO-WEAR
            </motion.span>
          </div>

          {/* Sliding Gold Clasp Handle */}
          <motion.div
            layout
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 28,
              mass: 0.9,
            }}
            className="relative z-10 h-full aspect-square rounded-full border-[2.5px] border-charcoal bg-gradient-to-br from-[#FCE38A] via-[#E5A93B] to-[#8C5308] shadow-[3px_3px_0px_#141413] flex items-center justify-center shrink-0"
          >
            {/* Inner Engraved Ring & Swapped Icons */}
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full border-[1.5px] border-charcoal flex items-center justify-center bg-amber-300/25 text-charcoal">
              <AnimatePresence mode="wait" initial={false}>
                {isBespoke ? (
                  <motion.svg
                    key="garment"
                    initial={{ rotate: 45, scale: 0.7, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -45, scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16.5 3L14 5h-4L7.5 3 3 6.5l2.5 3L7 8.5V20h10V8.5l1.5 1 2.5-3L16.5 3z" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="scissors"
                    initial={{ rotate: -45, scale: 0.7, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 45, scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="6" cy="6" r="2.3" />
                    <circle cx="6" cy="18" r="2.3" />
                    <path
                      strokeLinecap="round"
                      d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </motion.button>

      {/* Animated Status Caption */}
      <div className="mt-4 h-7 flex items-center justify-center overflow-hidden text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={isBespoke ? 'bespoke-caption' : 'rtw-caption'}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.18em] sm:tracking-[0.22em] uppercase text-charcoal bg-alabaster/90 px-3 py-1"
          >
            {isBespoke
              ? 'NOW SHOWING: BESPOKE COUTURE'
              : 'NOW SHOWING: READY-TO-WEAR CAPSULES'}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}