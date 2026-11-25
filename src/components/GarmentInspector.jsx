import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GarmentInspector({
  items = [],
  selectedIndex = null,
  onClose,
  onSelectIndex,
  onOpenAvailability,
}) {
  const [viewSide, setViewSide] = useState('front');
  const [colorIndex, setColorIndex] = useState(0);

  const isOpen = selectedIndex !== null && items[selectedIndex];
  const currentItem = isOpen ? items[selectedIndex] : null;
  const colorways = currentItem?.colorways || [];
  const activeColorway = colorways[colorIndex] || colorways[0];

  // Reset to front view & primary colorway whenever the user switches garments
  useEffect(() => {
    setViewSide('front');
    setColorIndex(0);
  }, [selectedIndex]);

  // Support Escape, ArrowLeft, and ArrowRight keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      } else if (e.key === 'ArrowRight') {
        onSelectIndex?.((selectedIndex + 1) % items.length);
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex?.((selectedIndex - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, items.length, onClose, onSelectIndex]);

  const handlePrev = () => {
    if (!items.length) return;
    onSelectIndex?.((selectedIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    if (!items.length) return;
    onSelectIndex?.((selectedIndex + 1) % items.length);
  };

  const displayedImage =
    viewSide === 'back'
      ? activeColorway?.backImg || activeColorway?.frontImg
      : activeColorway?.frontImg || activeColorway?.sideImg;

  const isBackFlip = viewSide === 'back';

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Inspecting ${currentItem.name}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-0 z-40 flex flex-col justify-between bg-[#FAF6EE]/75 backdrop-blur-md px-4 sm:px-10 md:px-16 py-5 sm:py-7 select-none"
        >
          {/* Top Bar: Piece Counter + Close Button */}
          <div className="relative z-20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-[#141413] text-[#FAF6EE] font-mono text-[11px] sm:text-xs font-extrabold tracking-[0.2em] uppercase">
                {String(selectedIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <span className="hidden sm:inline-block font-mono text-xs font-bold tracking-[0.18em] uppercase text-charcoal/70">
                {currentItem.code}
              </span>
            </div>

            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ y: -2, boxShadow: '5px 5px 0px #141413' }}
              whileTap={{ x: 2, y: 2, boxShadow: '1px 1px 0px #141413' }}
              className="px-4 py-2 rounded-full bg-alabaster text-charcoal border-[2px] border-charcoal shadow-[3px_3px_0px_#141413] font-mono text-xs font-extrabold tracking-[0.18em] uppercase flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <span>CLOSE</span>
              <span aria-hidden="true" className="text-sm leading-none">✕</span>
            </motion.button>
          </div>

          {/* Center Stage: Left Arrow + Focused Garment + Colorway Mini-Hangers + Right Arrow */}
          <div className="relative flex-1 flex items-center justify-center my-2">
            {/* Previous Garment Button */}
            <motion.button
              type="button"
              onClick={handlePrev}
              aria-label="Previous garment"
              whileHover={{ scale: 1.06, boxShadow: '5px 5px 0px #141413' }}
              whileTap={{ x: 2, y: 2, boxShadow: '1px 1px 0px #141413' }}
              className="absolute left-0 sm:left-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-alabaster text-charcoal border-[2px] border-charcoal shadow-[3px_3px_0px_#141413] flex items-center justify-center cursor-pointer focus:outline-none"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </motion.button>

            {/* Garment Artwork + Floating Colorway Mini-Hangers */}
            <div className="relative flex items-center justify-center w-full max-w-xl mx-auto px-12 sm:px-16">
              <div
                style={{ perspective: '1200px' }}
                className="relative w-full max-h-[54vh] sm:max-h-[60vh] aspect-[3/4] flex items-center justify-center"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${currentItem.id}-${colorIndex}-${viewSide}`}
                    initial={{
                      opacity: 0,
                      rotateY: isBackFlip ? 85 : -85,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      rotateY: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotateY: isBackFlip ? -85 : 85,
                      scale: 0.96,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 22,
                      mass: 0.85,
                    }}
                    style={{
                      transformOrigin: '50% 10%',
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                    }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={displayedImage}
                      alt={`${currentItem.name} (${viewSide} view)`}
                      className="w-full h-full object-contain drop-shadow-[0_22px_28px_rgba(20,20,19,0.28)]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating Colorway Mini-Hangers (Top-Right of Garment) */}
              {colorways.length > 0 && (
                <div
                  aria-label="Colorway variants"
                  className="absolute top-2 right-2 sm:right-4 z-20 flex flex-col gap-2.5"
                >
                  {colorways.map((cw, idx) => {
                    const isSelectedColor = idx === colorIndex;
                    return (
                      <motion.button
                        key={cw.id}
                        type="button"
                        onClick={() => setColorIndex(idx)}
                        title={cw.label}
                        aria-label={`Select ${cw.label} colorway`}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative w-12 h-14 sm:w-14 sm:h-16 rounded-xl p-1.5 bg-[#FAF6EE] border-[2px] border-charcoal flex flex-col items-center justify-between cursor-pointer focus:outline-none transition-shadow ${
                          isSelectedColor
                            ? 'shadow-[4px_4px_0px_#059669] ring-2 ring-emerald-600/40'
                            : 'shadow-[2px_2px_0px_#141413] opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={cw.frontImg || cw.sideImg}
                          alt={cw.label}
                          className="w-full h-9 sm:h-10 object-contain"
                        />
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-charcoal"
                          style={{ backgroundColor: cw.swatch }}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Next Garment Button */}
            <motion.button
              type="button"
              onClick={handleNext}
              aria-label="Next garment"
              whileHover={{ scale: 1.06, boxShadow: '5px 5px 0px #141413' }}
              whileTap={{ x: 2, y: 2, boxShadow: '1px 1px 0px #141413' }}
              className="absolute right-0 sm:right-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-alabaster text-charcoal border-[2px] border-charcoal shadow-[3px_3px_0px_#141413] flex items-center justify-center cursor-pointer focus:outline-none"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>
          </div>

          {/* Bottom Control Deck: Title + FRONT/BACK Pill Switch + SEE AVAILABILITY CTA */}
          <div className="relative z-20 flex flex-col items-center gap-3.5 pb-1">
            {/* Garment Name & Price */}
            <div className="text-center">
              <h2 className="font-display text-xl sm:text-3xl tracking-wider uppercase text-charcoal">
                {currentItem.name}
              </h2>
              <p className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-charcoal/70 mt-0.5">
                {currentItem.price} — {activeColorway?.label}
              </p>
            </div>

            {/* Action Row: FRONT/BACK Pill + SEE AVAILABILITY */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {/* FRONT / BACK Neo-Brutalist Pill Toggle */}
              <div
                role="group"
                aria-label="Garment view angle"
                className="inline-flex items-center p-1 rounded-full bg-[#FAF6EE] border-[2px] border-charcoal shadow-[3px_3px_0px_#141413]"
              >
                {['front', 'back'].map((side) => {
                  const active = viewSide === side;
                  return (
                    <button
                      key={side}
                      type="button"
                      onClick={() => setViewSide(side)}
                      className={`relative px-4 sm:px-5 py-1.5 rounded-full font-mono text-xs font-extrabold tracking-[0.18em] uppercase transition-colors cursor-pointer focus:outline-none ${
                        active ? 'text-[#FAF6EE]' : 'text-charcoal hover:text-blue-600'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="inspectorSidePill"
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-[#141413]"
                        />
                      )}
                      <span className="relative z-10">{side}</span>
                    </button>
                  );
                })}
              </div>

              {/* Open Availability / Fitting Sheet Button */}
              <motion.button
                type="button"
                onClick={() => onOpenAvailability?.(selectedIndex, colorIndex)}
                whileHover={{ y: -2, boxShadow: '5px 5px 0px #141413' }}
                whileTap={{ x: 2, y: 2, boxShadow: '1px 1px 0px #141413' }}
                className="px-5 sm:px-6 py-2.5 rounded-full bg-emerald-600 text-white border-[2px] border-charcoal shadow-[3px_3px_0px_#141413] font-mono text-xs font-extrabold tracking-[0.16em] uppercase cursor-pointer focus:outline-none"
              >
                SEE AVAILABILITY
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}