import { useState } from 'react';
import { motion } from 'framer-motion';
import { RACK_IMAGE } from '../data/collectionsData';

export default function GarmentRack({
  items = [],
  selectedIndex = null,
  onSelectGarment,
  onOpenAvailability,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex;
  const activeItem =
    activeIndex !== null && items[activeIndex] ? items[activeIndex] : null;

  const isBlurred = selectedIndex !== null;

  const marqueeItems = [
    'GEGS',
    'CRAFTED IN SMALL BATCHES',
    'BESPOKE FITTING BY APPOINTMENT',
    'FRONT & BACK INSPECTOR',
    'OGUN / STUDIO ARCHIVE',
  ];

  return (
    <section
      aria-label="Garment rack"
      className={`relative flex-1 flex flex-col justify-between transition-all duration-300 ${
        isBlurred ? 'blur-[2px] scale-[0.99] opacity-65 pointer-events-none' : ''
      }`}
    >
      {/* Top Rack Header */}
      <div className="w-full px-4 sm:px-10 md:px-16 pt-2 pb-3 flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] sm:text-xs font-extrabold tracking-[0.22em] uppercase text-charcoal">
            THE COLATION
          </span>
          <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-charcoal/65">
            {activeItem
              ? `${activeItem.code} — ${activeItem.name} (${activeItem.price})`
              : 'MOVE CURSOR OVER A PIECE ON THE ROD'}
          </span>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-alabaster text-charcoal border-[2px] border-charcoal shadow-[3px_3px_0px_#141413] font-mono text-[11px] sm:text-xs font-extrabold tracking-[0.18em] uppercase shrink-0">
          {items.length} PIECES
        </span>
      </div>

      {/* Center Stage: Proportionate Rod + Tightly Packed Trimmed Garments */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-10 md:px-16 py-6 min-h-[430px] sm:min-h-[520px]">
        <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
          <div className="relative w-full max-w-xl sm:max-w-2xl flex flex-col items-center">
            {/* Rod Layer (z-20 so hanger hooks sit cleanly behind the bar) */}
            <div className="relative w-full h-24 sm:h-32 flex items-center justify-center z-20 pointer-events-none select-none">
              <img
                src={RACK_IMAGE}
                alt="GEGS Garment Rack"
                className="w-full h-full object-fill contrast-125 brightness-95 drop-shadow-[0_6px_12px_rgba(20,20,19,0.25)]"
              />
            </div>

            {/* Tightly Packed Garments Using Natural Trimmed Widths (z-10) */}
            <div className="-mt-14 sm:-mt-[74px] flex items-start justify-center gap-1 sm:gap-2 z-10">
              {items.map((item, idx) => {
                const primaryColor = item.colorways?.[0];
                const restingImg =
                  primaryColor?.sideImg ||
                  primaryColor?.frontImg ||
                  primaryColor?.backImg;
                const hoverImg =
                  primaryColor?.frontImg ||
                  primaryColor?.sideImg ||
                  primaryColor?.backImg;

                const isHovered = hoveredIndex === idx;
                const isSelected = selectedIndex === idx;
                const isActive = isHovered || isSelected;
                const displaySrc = isActive ? hoverImg : restingImg;

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
                    initial={false}
                    animate={
                      isHovered
                        ? {
                            y: [0, -2, 2, -1.5, 1, 0],
                            rotate: [0, -3, 2.5, -1.5, 0.8, 0],
                            scale: 1.14,
                            zIndex: 30,
                          }
                        : {
                            y: isSelected ? -2 : 0,
                            rotate: 0,
                            scale: isSelected ? 1.08 : 1,
                            zIndex: isSelected ? 25 : 10,
                          }
                    }
                    transition={
                      isHovered
                        ? {
                            duration: 0.55,
                            ease: 'easeInOut',
                          }
                        : {
                            type: 'spring',
                            stiffness: 360,
                            damping: 22,
                          }
                    }
                    style={{ transformOrigin: 'top center' }}
                    className="group relative flex flex-col items-center cursor-pointer focus:outline-none shrink-0"
                  >
                    <img
                      src={displaySrc}
                      alt={item.name}
                      className={`w-auto object-contain object-top transition-[height] duration-200 drop-shadow-[0_12px_16px_rgba(20,20,19,0.22)] ${
                        isActive
                          ? 'h-64 sm:h-80 md:h-[340px]'
                          : 'h-60 sm:h-72 md:h-80'
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Centered Availability Pill CTA Below the Rack */}
          <div className="mt-8">
            <button
              type="button"
              onClick={() => onOpenAvailability?.(activeIndex ?? 0)}
              className="px-6 py-2 rounded-full bg-alabaster text-charcoal border-[2px] border-charcoal shadow-[3px_3px_0px_#141413] hover:bg-emerald-600 hover:text-white hover:-translate-y-0.5 active:translate-x-[1px] active:translate-y-[1px] font-mono text-[11px] font-extrabold tracking-[0.18em] uppercase cursor-pointer transition-all"
            >
              SEE AVAILABILITY
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Continuous Marquee Ticker */}
      <div className="w-full border-t-[2px] border-b-[2px] border-charcoal bg-cahrcoal text-white py-2 overflow-hidden select-none">
        <motion.div
          className="flex w-max items-center gap-8 font-mono text-[11px] sm:text-xs font-extrabold tracking-[0.22em] uppercase"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        >
          {[...marqueeItems, ...marqueeItems].map((entry, i) => (
            <span key={`${entry}-${i}`} className="inline-flex items-center gap-8">
              <span>{entry}</span>
              <span aria-hidden="true">//</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}