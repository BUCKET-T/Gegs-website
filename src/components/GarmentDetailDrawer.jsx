import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GarmentDetailDrawer({
  isOpen = false,
  item = null,
  initialColorIndex = 0,
  onClose,
  onBookFitting,
}) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(initialColorIndex);
  const [selectedAngle, setSelectedAngle] = useState('front');
  const [selectedSize, setSelectedSize] = useState('M');
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync colorway and reset form state whenever the drawer opens for a garment
  useEffect(() => {
    if (isOpen && item) {
      setSelectedColorIdx(initialColorIndex || 0);
      setSelectedAngle('front');
      setSelectedSize(item.sizes?.[1] || item.sizes?.[0] || 'M');
      setIsSubmitted(false);
    }
  }, [isOpen, item, initialColorIndex]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!item) return null;

  const colorways = item.colorways || [];
  const activeColorway = colorways[selectedColorIdx] || colorways[0];

  const mainImage =
    selectedAngle === 'back'
      ? activeColorway?.backImg || activeColorway?.frontImg
      : selectedAngle === 'side'
      ? activeColorway?.sideImg || activeColorway?.frontImg
      : activeColorway?.frontImg || activeColorway?.sideImg;

  const angleOptions = [
    { id: 'front', label: 'FRONT', src: activeColorway?.frontImg },
    { id: 'back', label: 'BACK', src: activeColorway?.backImg },
    { id: 'side', label: 'PROFILE', src: activeColorway?.sideImg },
  ].filter((angle) => Boolean(angle.src));

  const handleSubmitEnquiry = (e) => {
    e.preventDefault();

    const payload = {
      garmentId: item.id,
      garmentName: item.name,
      price: item.price,
      colorway: activeColorway?.label || 'PRIMARY',
      size: selectedSize,
      clientName: clientName.trim(),
      clientContact: clientContact.trim(),
      notes: notes.trim(),
    };

    if (onBookFitting) {
      onBookFitting(payload);
    }

    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${item.name} availability and fitting details`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-[#141413]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative w-full max-w-5xl bg-alabaster text-charcoal rounded-2xl sm:rounded-3xl border-[2.5px] border-charcoal shadow-[8px_8px_0px_#141413] overflow-hidden my-auto"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 sm:px-8 py-4 border-b-[2px] border-charcoal bg-[#FAF6EE]">
              <div className="flex items-center gap-2.5 font-mono text-[11px] sm:text-xs font-extrabold tracking-[0.2em] uppercase">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-600 border border-charcoal" />
                <span>{item.code || 'ATELIER PIECE'} // MADE TO ORDER</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close detail sheet"
                className="px-3.5 py-1.5 rounded-full bg-alabaster text-charcoal border-[2px] border-charcoal shadow-[3px_3px_0px_#141413] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#141413] font-mono text-xs font-extrabold tracking-[0.16em] uppercase cursor-pointer focus:outline-none"
              >
                CLOSE ✕
              </button>
            </div>

            {/* Split-Screen Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* LEFT COLUMN: Garment Visual Stage + Angle Thumbnails */}
              <div className="relative bg-[#F3EDE0] border-b-[2px] md:border-b-0 md:border-r-[2px] border-charcoal p-5 sm:p-8 flex flex-col justify-between">
                <div className="relative w-full aspect-[3/4] max-h-[360px] sm:max-h-[430px] mx-auto flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${item.id}-${selectedColorIdx}-${selectedAngle}`}
                      src={mainImage}
                      alt={`${item.name} - ${selectedAngle}`}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full object-contain drop-shadow-[0_18px_24px_rgba(20,20,19,0.22)]"
                    />
                  </AnimatePresence>
                </div>

                {/* Angle Switcher Thumbnails */}
                {angleOptions.length > 1 && (
                  <div className="mt-5 flex items-center justify-center gap-3">
                    {angleOptions.map((angle) => {
                      const active = selectedAngle === angle.id;
                      return (
                        <button
                          key={angle.id}
                          type="button"
                          onClick={() => setSelectedAngle(angle.id)}
                          className={`px-3 py-2 rounded-xl border-[2px] border-charcoal flex flex-col items-center gap-1 cursor-pointer focus:outline-none transition-all ${
                            active
                              ? 'bg-[#141413] text-[#FAF6EE] shadow-[3px_3px_0px_#2563EB]'
                              : 'bg-alabaster text-charcoal shadow-[2px_2px_0px_#141413] hover:-translate-y-0.5'
                          }`}
                        >
                          <img
                            src={angle.src}
                            alt={angle.label}
                            className="w-10 h-12 object-contain"
                          />
                          <span className="font-mono text-[10px] font-extrabold tracking-[0.16em] uppercase">
                            {angle.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: Specifications, Size Picker & Fitting Enquiry */}
              <div className="p-5 sm:p-8 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-display text-2xl sm:text-4xl tracking-wider uppercase text-charcoal">
                      {item.name}
                    </h2>
                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white border-[2px] border-charcoal shadow-[2px_2px_0px_#141413] font-mono text-xs sm:text-sm font-extrabold tracking-[0.12em]">
                      {item.price}
                    </span>
                  </div>

                  <p className="mt-3 text-sm sm:text-base text-charcoal/80 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Colorway Selector */}
                  {colorways.length > 0 && (
                    <div className="mt-5">
                      <span className="block font-mono text-[11px] font-extrabold tracking-[0.2em] uppercase text-charcoal/70 mb-2">
                        COLORWAY: <span className="text-charcoal">{activeColorway?.label}</span>
                      </span>
                      <div className="flex flex-wrap items-center gap-2.5">
                        {colorways.map((cw, idx) => {
                          const active = idx === selectedColorIdx;
                          return (
                            <button
                              key={cw.id}
                              type="button"
                              onClick={() => setSelectedColorIdx(idx)}
                              className={`px-3 py-1.5 rounded-full border-[2px] border-charcoal font-mono text-xs font-bold tracking-[0.14em] uppercase flex items-center gap-2 cursor-pointer focus:outline-none ${
                                active
                                  ? 'bg-[#141413] text-[#FAF6EE] shadow-[3px_3px_0px_#059669]'
                                  : 'bg-alabaster text-charcoal shadow-[2px_2px_0px_#141413]'
                              }`}
                            >
                              <span
                                className="w-3 h-3 rounded-full border border-charcoal"
                                style={{ backgroundColor: cw.swatch }}
                              />
                              <span>{cw.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Size Selector */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[11px] font-extrabold tracking-[0.2em] uppercase text-charcoal/70">
                        SELECT SIZE
                      </span>
                      <span className="font-mono text-[10px] font-bold tracking-[0.16em] uppercase text-emerald-700">
                        IN STOCK / BESPOKE AVAILABLE
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {[...(item.sizes || ['S', 'M', 'L', 'XL']), 'BESPOKE'].map((size) => {
                        const active = selectedSize === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 rounded-xl border-[2px] border-charcoal font-mono text-xs font-extrabold tracking-[0.16em] uppercase cursor-pointer focus:outline-none transition-all ${
                              active
                                ? 'bg-emerald-600 text-white shadow-[3px_3px_0px_#141413] -translate-y-0.5'
                                : 'bg-alabaster text-charcoal shadow-[2px_2px_0px_#141413] hover:bg-[#F3EDE0]'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Fitting / Availability Enquiry Form */}
                {isSubmitted ? (
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-600/15 border-[2px] border-charcoal shadow-[4px_4px_0px_#141413]">
                    <p className="font-mono text-xs font-extrabold tracking-[0.18em] uppercase text-emerald-800">
                      FITTING REQUEST LOGGED
                    </p>
                    <p className="mt-1.5 text-sm text-charcoal">
                      We reserved <span className="font-bold">{item.name}</span> ({selectedSize}) for your atelier enquiry. Our team will reach out shortly to confirm your fitting slot.
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-4 px-5 py-2.5 rounded-full bg-[#141413] text-[#FAF6EE] font-mono text-xs font-extrabold tracking-[0.16em] uppercase border-[2px] border-charcoal cursor-pointer"
                    >
                      RETURN TO RACK
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitEnquiry} className="space-y-3 border-t-[2px] border-charcoal/15 pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="YOUR NAME"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6EE] border-[2px] border-charcoal font-mono text-xs font-bold tracking-[0.12em] text-charcoal placeholder:text-charcoal/45 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <input
                        type="text"
                        required
                        value={clientContact}
                        onChange={(e) => setClientContact(e.target.value)}
                        placeholder="PHONE OR EMAIL"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6EE] border-[2px] border-charcoal font-mono text-xs font-bold tracking-[0.12em] text-charcoal placeholder:text-charcoal/45 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="PREFERRED FITTING DATE OR NOTES (OPTIONAL)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6EE] border-[2px] border-charcoal font-mono text-xs font-bold tracking-[0.12em] text-charcoal placeholder:text-charcoal/45 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />

                    <motion.button
                      type="submit"
                      whileHover={{ y: -2, boxShadow: '6px 6px 0px #141413' }}
                      whileTap={{ x: 2, y: 2, boxShadow: '2px 2px 0px #141413' }}
                      className="w-full py-3.5 rounded-full bg-emerald-600 text-white font-mono text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase border-[2px] border-charcoal shadow-[4px_4px_0px_#141413] cursor-pointer focus:outline-none"
                    >
                      REQUEST FITTING // {selectedSize}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}