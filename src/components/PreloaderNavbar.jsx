import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emblem from '../assets/icon/gegs-emblem.svg';

export default function PreloaderNavbar({ onBookFitting }) {
  const [hasArrived, setHasArrived] = useState(false);
  const [isDockedInFlow, setIsDockedInFlow] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);

    // Step 1: Trigger the diagonal glide to top-left after 1.2 seconds
    const moveTimer = setTimeout(() => {
      setHasArrived(true);
    }, 1200);

    // Step 2: Release fixed positioning once the spring settles into the top-left slot
    const dockTimer = setTimeout(() => {
      setIsDockedInFlow(true);
    }, 1750);

    // Step 3: Once docked at top-left, slide out the navigation links and CTA button
    const revealTimer = setTimeout(() => {
      setIsComplete(true);
    }, 1800);

    return () => {
      window.removeEventListener('resize', checkViewport);
      clearTimeout(moveTimer);
      clearTimeout(dockTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  const navLinks = [
    { name: 'COLLECTIONS', href: '#collections' },
    { name: 'PROCESS', href: '#process' },
    { name: 'SERVICES', href: '#services' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const brandMarkContent = (
    <a href="#" className="flex items-center gap-1.5 sm:gap-2.5 group focus:outline-none">
      <img
        src={emblem}
        alt="GEGS Emblem"
        className="w-10 h-10 sm:w-16 sm:h-16 object-contain scale-125 transition-transform group-hover:scale-135"
      />
      <span className="font-display text-2xl sm:text-4xl tracking-wider uppercase">
        <span className="text-charcoal">GE</span>
        <span className="text-blue-600">GS</span>
      </span>
    </a>
  );

  return (
    <header className="w-full bg-alabaster px-4 sm:px-10 md:px-16 py-5 sm:py-6 flex items-center justify-between select-none relative z-30">
      {/* Full-Screen Backdrop Overlay during initial center loading phase */}
      <motion.div
        animate={hasArrived ? { opacity: 0, pointerEvents: 'none' } : { opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-40 bg-alabaster"
      />

      {/* Brand Mark: Glides from center to top-left during preloader, then docks into normal header flow */}
      {!isDockedInFlow ? (
        <>
          <motion.div
            initial={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              scale: isMobile ? 1.25 : 1.4,
            }}
            animate={
              hasArrived
                ? {
                    top: isMobile ? '20px' : '24px',
                    left: isMobile ? '16px' : '40px',
                    x: '0%',
                    y: '0%',
                    scale: 1,
                  }
                : {
                    top: '50%',
                    left: '50%',
                    x: '-50%',
                    y: '-50%',
                    scale: isMobile ? 1.25 : 1.4,
                  }
            }
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 24,
              mass: 1.2,
            }}
            className="z-50"
          >
            {brandMarkContent}
          </motion.div>
          <div className="w-[115px] sm:w-[220px] shrink-0" />
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0.95 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="relative z-20 shrink-0"
        >
          {brandMarkContent}
        </motion.div>
      )}

      {/* Center Desktop Navigation Links */}
      <motion.nav
        initial={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
        animate={
          isComplete
            ? { opacity: 1, x: 0, filter: 'blur(0px)' }
            : { opacity: 0, x: -30, filter: 'blur(4px)' }
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex items-center gap-8 font-mono text-xs font-bold tracking-[0.2em] uppercase text-charcoal"
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="relative py-1 hover:text-blue-600 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-charcoal hover:after:w-full after:transition-all"
          >
            {link.name}
          </a>
        ))}
      </motion.nav>

      {/* Desktop Book Fitting CTA + Mobile Hamburger Toggle */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={
          isComplete
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: -24 }
        }
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-2.5 sm:gap-4"
      >
        {/* Desktop Book Fitting Button */}
        <motion.button
          type="button"
          onClick={onBookFitting}
          whileHover={{ y: -2, boxShadow: '6px 6px 0px #141413' }}
          whileTap={{ x: 2, y: 2, boxShadow: '2px 2px 0px #141413' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="hidden md:block px-6 py-3 rounded-full bg-emerald-600 text-white font-mono text-sm font-extrabold tracking-[0.16em] uppercase border-[2px] border-charcoal shadow-[4px_4px_0px_#141413] cursor-pointer focus:outline-none"
        >
          BOOK FITTING
        </motion.button>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden w-10 h-10 rounded-full bg-alabaster border-[2px] border-charcoal shadow-[3px_3px_0px_#141413] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#141413] flex flex-col items-center justify-center gap-1.5 cursor-pointer focus:outline-none"
        >
          <span
            className={`w-4 h-[2px] bg-charcoal transition-transform duration-200 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''
            }`}
          />
          <span
            className={`w-4 h-[2px] bg-charcoal transition-opacity duration-200 ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-4 h-[2px] bg-charcoal transition-transform duration-200 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''
            }`}
          />
        </button>
      </motion.div>

      {/* Mobile Dropdown Navigation Drawer (Includes Book Fitting CTA) */}
      <AnimatePresence>
        {isMobileMenuOpen && isComplete && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 p-5 rounded-2xl bg-alabaster border-[2.5px] border-charcoal shadow-[6px_6px_0px_#141413] z-40 flex flex-col gap-4 font-mono text-xs font-bold tracking-[0.2em] uppercase text-charcoal"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 border-b border-charcoal/10 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Book Fitting Button inside Mobile Menu Drawer */}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onBookFitting) onBookFitting();
              }}
              className="mt-2 w-full py-3 rounded-full bg-emerald-600 text-white font-mono text-xs font-extrabold tracking-[0.16em] uppercase border-[2px] border-charcoal shadow-[3px_3px_0px_#141413] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#141413] cursor-pointer text-center"
            >
              BOOK FITTING
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}