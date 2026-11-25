import { useState } from 'react';
import { motion } from 'framer-motion';
import { COLLECTIONS, RACK_IMAGE } from '../data/collectionsData';

export default function GarmentRack({
  items = COLLECTIONS,
  selectedIndex = null,
  onSelectGarment,
  onOpenAvailability,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const isAnyFocused = selectedIndex !== null;

  return (
    <section
      aria-label="Interactive Garment Rack"
      className={`relative w-full min-h-[calc(100vh-92px)] bg-alabaster text-charcoal flex flex-col justify-between overflow-hidden transition-all duration-500 ${
        isAnyFocused ? 'blur-md scale-[0.98] opacity-55 pointer-events-none select-none' : ''
      }`}
    >
      {/* Top Studio Header Strip */}
      <div className="w-full px-4 sm:px-10 md:px-16 pt-4 sm:pt-6 flex items-center justify-between font-mono text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
        <span className="text-charcoal/70">ATELIER RACK // HOVER TO INSPECT</span>
        <span className="px-3 py-1 rounded-full border-[2px] border-charcoal bg-[#FAF6EE] shadow-[2px_2px_0px_#141413]">
          {items.length} PIECES
        </span>
      </div>

      {/* Rack & Hanging Garments Stage */}
      <div className="relative w-full max-w-6xl mx-auto px-3 sm:px-8 my-auto py-8 flex items-center justify-center">
        <div className="relative w-full">
          {/* Background Garment Rack Image */}
          <img
            src={RACK_IMAGE}
            alt="GEGS Studio Garment Rack"
            className="relative z-0 w-full h-auto object-contain pointer-events-none select-none"
          />

          {/* Hanging Garments Row — adjust top-[16%] to match your rack crossbar */}
          <div className="absolute inset-x-[12%] sm:inset-x-[16%] top-[16%] z-10 flex items-start justify-around gap-2 sm:gap-5">
            {items.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;
              const primaryColorway = item.colorways?.[0];
              const activeImg = isHovered
                ? primaryColorway?.frontImg || primaryColorway?.sideImg
                : primaryColorway?.sideImg || primaryColorway?.frontImg;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onFocus={() => setHoveredIndex(idx)}
                  onBlur={() => setHoveredIndex(null)}
                  onClick={() => onSelectGarment?.(idx)}
                  aria-label={`Inspect ${item.name}`}
                  style={{ transformOrigin: 'top center' }}
                  animate={{
                    y: isHovered ? 8 : 0,
                    scale: isHovered ? 1.08 : isDimmed ? 0.96 : 1,
                    opacity: isDimmed ? 0.72 : 1,
                    rotate: isHovered ? 0 : idx % 2 === 0 ? -1.2 : 1.2,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 24,
                  }}
                  className="group relative flex flex-col items-center focus:outline-none cursor-pointer w-1/4 max-w-[180px]"
                >
                  {/* Garment Artwork */}
                  <div className="relative w-full aspect-[3/4] flex items-start justify-center">
                    <img
                      src={activeImg}
                      alt={item.name}
                      className="w-full h-full object-contain drop-shadow-[0_10px_14px_rgba(20,20,19,0.22)] transition-transform duration-300"
                    />
                  </div>

                  {/* Floating Neo-Brutalist Label on Hover */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 6 : 0,
                    }}
                    transition={{ duration: 0.18 }}
                    className="pointer-events-none mt-2 px-2.5 py-1 rounded-full bg-[#141413] text-[#FAF6EE] border-[2px] border-charcoal shadow-[3px_3px_0px_#059669] font-mono text-[10px] sm:text-xs font-extrabold tracking-[0.14em] uppercase whitespace-nowrap"
                  >
                    {item.name}
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Continuous Marquee Bar */}
      <div className="w-full border-t-[2px] border-charcoal bg-[#141413] text-[#FAF6EE] overflow-hidden py-3">
        <button
          type="button"
          onClick={() => onOpenAvailability?.(hoveredIndex ?? 0)}
          className="w-full block text-left cursor-pointer focus:outline-none group"
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 18 }}
            className="flex w-max whitespace-nowrap font-mono text-xs sm:text-sm font-extrabold tracking-[0.24em] uppercase"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="mx-6 flex items-center gap-6">
                <span className="group-hover:text-emerald-400 transition-colors">
                  SEE AVAILABILITY
                </span>
                <span className="text-blue-500">///</span>
                <span>GEGS ATELIER COLLECTION</span>
                <span className="text-emerald-500">///</span>
              </span>
            ))}
          </motion.div>
        </button>
      </div>
    </section>
  );
}