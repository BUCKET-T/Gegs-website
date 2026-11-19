import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  initConsultationModalAnimations,
  modalBackdropMotion,
  followStudioMotion,
  inquiryCardMotion,
  availabilityCardMotion,
  socialPillMotion,
  submitButtonMotion,
  dropdownMenuMotion,
} from '../animations/ConsultationModalMotion';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meagzndy';

function SocialPlatformIcon({ name }) {
  switch (name) {
    case 'INSTAGRAM':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'PINTEREST':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="12" cy="12" r="9" />
          <path
            d="M10.2 19.5L11.6 13.5M10.5 14.2C9.5 13.6 9 12.6 9 11.4C9 9.3 10.6 7.8 12.8 7.8C14.8 7.8 16.2 9.1 16.2 11.1C16.2 13.4 14.9 15 13 15C12.1 15 11.4 14.5 11.2 13.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'WHATSAPP':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path
            d="M20 11.5C20 16.2 16.2 20 11.5 20C10 20 8.5 19.6 7.3 18.9L4 20L5.2 16.8C4.4 15.5 4 13.6 4 11.5C4 6.8 7.8 3 12.5 3C16.8 3 20 6.8 20 11.5Z"
            strokeLinejoin="round"
          />
          <path
            d="M9.4 8.8C9.6 8.4 9.9 8.4 10.2 8.4L10.9 10.1C11 10.4 10.9 10.7 10.7 10.9L10.3 11.4C10.8 12.3 11.5 13 12.4 13.5L12.9 13.1C13.1 12.9 13.4 12.8 13.7 12.9L15.4 13.6C15.4 13.9 15.4 14.2 15 14.4C14.5 14.8 13.8 15 13.1 14.8C11.4 14.3 9.9 12.8 9.2 11.1C9 10.4 9.1 9.4 9.4 8.8Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M4 6.5L12 12.5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

const SOCIAL_LINKS = [
  { name: 'INSTAGRAM', href: 'https://www.instagram.com/__gegs?cnvx=MTFyYnJvaWJjeWtrZA==', accent: 'bg-amber-400 text-[#141413]' },
  { name: 'PINTEREST', href: 'https://www.pinterest.com', accent: 'bg-[#FAF6EE] text-[#141413]' },
  { name: 'WHATSAPP', href: 'https://wa.me/2348067951762', accent: 'bg-blue-600 text-white' },
  { name: 'EMAIL', href: 'mailto:emmanuelgegs@gmail.com', accent: 'bg-[#FAF6EE] text-[#141413]' },
];

const SERVICE_OPTIONS = [
  'Bridal Couture',
  'Bespoke Tailoring',
  'Hand-Draped Eveningwear',
  'Ready-to-Wear Capsule',
  'Private Fitting & Styling',
  'Others',
];

function CrossingRibbonBadge({ variant = 0 }) {
  if (variant % 3 === 0) {
    return (
      <span className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-amber-400 border-[3px] sm:border-4 border-[#141413] shadow-[4px_4px_0px_#141413] mx-4 sm:mx-6 align-middle shrink-0">
        <svg viewBox="0 0 36 36" className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none">
          <path
            d="M12 15L30 7L27.5 12.5L13.5 18L12 15Z"
            fill="#FAF6EE"
            stroke="#141413"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 18L30 27L27.5 21.5L13.5 16L12 18Z"
            fill="#FAF6EE"
            stroke="#141413"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="9.5" cy="14" r="3.5" fill="#2563EB" stroke="#141413" strokeWidth="2.2" />
          <circle cx="9.5" cy="22.5" r="3.5" fill="#FAF6EE" stroke="#141413" strokeWidth="2.2" />
        </svg>
      </span>
    );
  }

  if (variant % 3 === 1) {
    return (
      <span className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-blue-600 border-[3px] sm:border-4 border-[#141413] shadow-[4px_4px_0px_#141413] mx-4 sm:mx-6 align-middle shrink-0">
        <svg viewBox="0 0 36 36" className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none">
          <path
            d="M18 5L21.8 14L31.5 18L21.8 22L18 31L14.2 22L4.5 18L14.2 14L18 5Z"
            fill="#F59E0B"
            stroke="#141413"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#FAF6EE] border-[3px] sm:border-4 border-[#141413] shadow-[4px_4px_0px_#141413] mx-4 sm:mx-6 align-middle shrink-0">
      <svg viewBox="0 0 36 36" className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none">
        <path
          d="M18 6C19.8 6 21 7.2 21 8.9C21 10.4 19.8 11.3 18.4 12L29.5 18H25.5V29.5H10.5V18H6.5L17.6 12"
          fill="#2563EB"
          stroke="#141413"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function ConsultationModal({
  isOpen = true,
  onClose,
  defaultService = 'Bridal Couture',
}) {
  const sectionRef = useRef(null);
  const topRibbonTrackRef = useRef(null);
  const bottomRibbonTrackRef = useRef(null);
  const dropdownRef = useRef(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(defaultService);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [vision, setVision] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setService(defaultService);
  }, [defaultService]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    return initConsultationModalAnimations(sectionRef, topRibbonTrackRef, bottomRibbonTrackRef);
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email,
          service,
          vision,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          data?.errors?.map((err) => err.message).join(', ') ||
          'Could not send your inquiry. Please try again.';
        throw new Error(message);
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err?.message || 'Network error while sending inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  const ribbonSegments = Array.from({ length: 5 }, (_, idx) => idx);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="contact"
          {...modalBackdropMotion}
          className="relative w-full bg-[#FAF6EE] text-[#141413] overflow-x-clip pt-12 sm:pt-16 pb-28 sm:pb-36 select-none"
        >
          <div ref={sectionRef} className="relative w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
              {onClose && (
                <div className="flex justify-end mb-4">
                  <motion.button
                    type="button"
                    onClick={onClose}
                    whileHover={{ y: -2, boxShadow: '5px 5px 0px #141413' }}
                    whileTap={{ x: 2, y: 2, boxShadow: '2px 2px 0px #141413' }}
                    className="px-4 py-1.5 rounded-full bg-white border-2 border-[#141413] shadow-[3px_3px_0px_#141413] font-mono text-xs font-extrabold tracking-[0.18em] uppercase cursor-pointer"
                  >
                    CLOSE ✕
                  </motion.button>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
                {/* 1. FOLLOW THE STUDIO */}
                <motion.aside
                  {...followStudioMotion}
                  className="lg:col-span-3 flex flex-col justify-start gap-4 pt-1"
                >
                  <p className="font-mono text-[11px] font-extrabold tracking-[0.22em] uppercase text-[#141413]/85">
                    FOLLOW THE STUDIO
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-3.5">
                    {SOCIAL_LINKS.map((item) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        {...socialPillMotion}
                        className={`w-full px-5 py-3.5 rounded-full ${item.accent} border-[2.5px] border-[#141413] shadow-[4px_4px_0px_#141413] flex items-center gap-3 font-mono text-xs font-extrabold tracking-[0.18em] uppercase`}
                      >
                        <SocialPlatformIcon name={item.name} />
                        <span>{item.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.aside>

                {/* 2. START AN INQUIRY */}
                <motion.div
                  {...inquiryCardMotion}
                  className="lg:col-span-6 bg-white rounded-[28px] border-[2.5px] border-[#141413] shadow-[8px_8px_0px_#141413] p-6 sm:p-8 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight leading-none text-[#141413]">
                      START AN INQUIRY
                    </h2>
                    <p className="font-serif italic text-sm sm:text-base text-[#141413]/80 mt-1.5">
                      Tell us about the piece you are dreaming of.
                    </p>

                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.45 }}
                        className="mt-6 p-5 rounded-2xl bg-[#FAF6EE] border-2 border-[#141413] shadow-[4px_4px_0px_#141413]"
                      >
                        <p className="font-mono text-xs font-extrabold tracking-[0.18em] uppercase text-blue-600">
                          INQUIRY LOGGED // OGUN ATELIER
                        </p>
                        <h3 className="font-display font-black text-xl uppercase mt-1">
                          WE HAVE YOUR BRIEF{fullName ? `, ${fullName}` : ''}.
                        </h3>
                        <p className="font-mono text-xs text-[#141413]/80 mt-2 leading-relaxed">
                          Our studio will follow up regarding <span className="font-bold">{service}</span> and share available fitting times.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitted(false);
                            setErrorMsg('');
                            setFullName('');
                            setEmail('');
                            setVision('');
                          }}
                          className="mt-4 px-5 py-2.5 rounded-full bg-amber-400 border-2 border-[#141413] shadow-[3px_3px_0px_#141413] font-mono text-xs font-extrabold uppercase tracking-[0.15em] cursor-pointer"
                        >
                          SEND ANOTHER BRIEF
                        </button>
                      </motion.div>
                    ) : (
                      <form
                        action={FORMSPREE_ENDPOINT}
                        method="POST"
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="inquiry-name"
                              className="block font-mono text-[11px] font-extrabold tracking-[0.18em] uppercase mb-1.5"
                            >
                              FULL NAME
                            </label>
                            <input
                              id="inquiry-name"
                              name="name"
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="Your Name"
                              className="w-full px-4 py-3 rounded-xl bg-[#FAF6EE] border-2 border-[#141413] font-mono text-xs sm:text-sm text-[#141413] placeholder:text-[#141413]/40 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="inquiry-email"
                              className="block font-mono text-[11px] font-extrabold tracking-[0.18em] uppercase mb-1.5"
                            >
                              EMAIL
                            </label>
                            <input
                              id="inquiry-email"
                              name="email"
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="w-full px-4 py-3 rounded-xl bg-[#FAF6EE] border-2 border-[#141413] font-mono text-xs sm:text-sm text-[#141413] placeholder:text-[#141413]/40 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                          </div>
                        </div>

                        <div ref={dropdownRef} className="relative">
                          <label
                            htmlFor="inquiry-service-btn"
                            className="block font-mono text-[11px] font-extrabold tracking-[0.18em] uppercase mb-1.5"
                          >
                            SERVICE
                          </label>
                          <input type="hidden" name="service" value={service} required />

                          <button
                            id="inquiry-service-btn"
                            type="button"
                            aria-haspopup="listbox"
                            aria-expanded={isDropdownOpen}
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                            className={`w-full px-4 py-3 rounded-xl bg-[#FAF6EE] border-2 border-[#141413] font-mono text-xs sm:text-sm text-[#141413] flex items-center justify-between gap-3 cursor-pointer transition-shadow focus:outline-none ${
                              isDropdownOpen
                                ? 'shadow-[4px_4px_0px_#2563EB] ring-2 ring-blue-600'
                                : 'shadow-[3px_3px_0px_#141413] hover:shadow-[4px_4px_0px_#141413]'
                            }`}
                          >
                            <span className="flex items-center gap-2.5 truncate">
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border border-[#141413] shrink-0" />
                              <span className="font-bold truncate">{service}</span>
                            </span>
                            <motion.span
                              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-xs font-black text-[#141413] shrink-0"
                            >
                              ▼
                            </motion.span>
                          </button>

                          <AnimatePresence>
                            {isDropdownOpen && (
                              <motion.ul
                                role="listbox"
                                aria-label="Service options"
                                {...dropdownMenuMotion}
                                className="absolute left-0 right-0 z-30 mt-1 rounded-2xl bg-[#FAF6EE] border-[2.5px] border-[#141413] shadow-[6px_6px_0px_#141413] p-1.5 space-y-1"
                              >
                                {SERVICE_OPTIONS.map((opt) => {
                                  const isSelected = service === opt;
                                  return (
                                    <li key={opt} role="option" aria-selected={isSelected}>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setService(opt);
                                          setIsDropdownOpen(false);
                                        }}
                                        className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-xs sm:text-sm flex items-center justify-between gap-2 text-left cursor-pointer transition-colors ${
                                          isSelected
                                            ? 'bg-blue-600 text-white font-extrabold border border-[#141413]'
                                            : 'text-[#141413] font-bold hover:bg-amber-400/75'
                                        }`}
                                      >
                                        <span>{opt}</span>
                                        {isSelected && (
                                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-[#141413] border border-[#141413]">
                                            SELECTED
                                          </span>
                                        )}
                                      </button>
                                    </li>
                                  );
                                })}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>

                        <div>
                          <label
                            htmlFor="inquiry-vision"
                            className="block font-mono text-[11px] font-extrabold tracking-[0.18em] uppercase mb-1.5"
                          >
                            YOUR VISION
                          </label>
                          <textarea
                            id="inquiry-vision"
                            name="vision"
                            rows={4}
                            required
                            value={vision}
                            onChange={(e) => setVision(e.target.value)}
                            placeholder="Silhouette, occasion, fabric preferences..."
                            className="w-full px-4 py-3 rounded-xl bg-[#FAF6EE] border-2 border-[#141413] font-mono text-xs sm:text-sm text-[#141413] placeholder:text-[#141413]/40 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                          />
                        </div>

                        {errorMsg && (
                          <p
                            role="alert"
                            className="p-3 rounded-xl bg-red-100 border-2 border-[#141413] font-mono text-xs font-bold text-red-900"
                          >
                            {errorMsg}
                          </p>
                        )}

                        <div className="pt-2 flex justify-end">
                          <motion.button
                            type="submit"
                            disabled={submitting}
                            {...submitButtonMotion}
                            className="px-7 py-3.5 rounded-full bg-[#141413] text-[#FAF6EE] font-mono text-xs font-extrabold tracking-[0.18em] uppercase border-2 border-[#141413] shadow-[4px_4px_0px_#141413] flex items-center gap-2 cursor-pointer disabled:opacity-60"
                          >
                            <span>{submitting ? 'SENDING...' : 'SEND INQUIRY'}</span>
                            <span aria-hidden="true">→</span>
                          </motion.button>
                        </div>
                      </form>
                    )}
                  </div>
                </motion.div>

                {/* 3. STUDIO AVAILABILITY */}
                <motion.aside
                  {...availabilityCardMotion}
                  className="lg:col-span-3 bg-amber-400 rounded-[28px] border-[2.5px] border-[#141413] shadow-[8px_8px_0px_#141413] p-6 flex flex-col justify-between"
                >
                  <div>
                    <p className="font-mono text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#141413]/85">
                      STUDIO AVAILABILITY
                    </p>
                    <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight leading-[0.94] mt-1 text-[#141413]">
                      OPEN FOR FITTINGS
                    </h3>

                    <div className="mt-4 flex items-center gap-2.5 font-mono text-xs font-bold leading-snug text-[#141413]">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-[#141413] shrink-0" />
                      <span>5 consultation slots this week</span>
                    </div>

                    <div className="my-5 border-t-2 border-[#141413]" />

                    <dl className="space-y-2.5 font-mono text-xs text-[#141413]">
                      <div className="flex items-center justify-between gap-2">
                        <dt className="font-bold">Mon - Fri</dt>
                        <dd className="font-extrabold">07:00 - 20:00</dd>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <dt className="font-bold">Saturday</dt>
                        <dd className="font-extrabold">10:00 - 14:00</dd>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <dt className="font-bold">Sunday</dt>
                        <dd className="font-extrabold">By appointment</dd>
                      </div>
                    </dl>
                  </div>

                  <p className="mt-8 pt-4 font-serif italic text-xs sm:text-sm leading-snug text-[#141413]/90">
                    14 Adeola Odeku Street, Mowe, Ogun State.
                  </p>
                </motion.aside>
              </div>
            </div>

            {/* Crossing Oversized Ribbons ("LET'S CREATE SOMETHING ICONIC") */}
            <div className="mt-16 sm:mt-24 relative w-full py-10 sm:py-16 overflow-hidden">
              <div className="relative z-10 w-[126%] -ml-[13%] -rotate-3 bg-[#141413] border-y-4 border-[#141413] shadow-[0px_10px_0px_#2563EB] py-5 sm:py-8 md:py-10 overflow-hidden">
                <div
                  ref={topRibbonTrackRef}
                  className="flex items-center whitespace-nowrap will-change-transform"
                >
                  {ribbonSegments.map((idx) => (
                    <div key={`top-${idx}`} className="inline-flex items-center shrink-0">
                      <span
                        className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter text-[#FAF6EE] leading-[0.9]"
                        style={{
                          textShadow: '4px 4px 0px #2563EB',
                        }}
                      >
                        LET&apos;S CREATE SOMETHING ICONIC
                      </span>
                      <CrossingRibbonBadge variant={idx} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-20 -mt-6 sm:-mt-10 w-[126%] -ml-[13%] rotate-3 bg-[#141413] border-y-4 border-[#141413] shadow-[0px_10px_0px_#141413] py-5 sm:py-8 md:py-10 overflow-hidden">
                <div
                  ref={bottomRibbonTrackRef}
                  className="flex items-center whitespace-nowrap will-change-transform"
                >
                  {ribbonSegments.map((idx) => (
                    <div key={`bottom-${idx}`} className="inline-flex items-center shrink-0">
                      <span
                        className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter text-[#FAF6EE] leading-[0.9]"
                        style={{
                          textShadow: '4px 4px 0px #2563EB',
                        }}
                      >
                        LET&apos;S CREATE SOMETHING ICONIC
                      </span>
                      <CrossingRibbonBadge variant={idx + 1} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}