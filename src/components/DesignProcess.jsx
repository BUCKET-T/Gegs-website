import { useEffect, useRef } from 'react';
import { initDesignProcessAnimations } from '../animations/DesignProcessMotion';

// Optional: paste a direct image URL here if you want a photo layer beneath the atelier wash
const ATELIER_BG_IMAGE = '';

const PROCESS_STEPS = [
  {
    step: '01',
    phase: 'STEP 01 // BRIEF & SKETCH',
    title: 'CONSULTATION & SILHOUETTE',
    tagColor: 'bg-amber-400 text-[#141413]',
    iconType: 'sketch',
    desktopPos: 'left-[4%] top-[16%] w-[265px]',
    points: [
      'Body proportions, posture & occasion brief',
      'Proportions & drape line croquis',
    ],
  },
  {
    step: '02',
    phase: 'STEP 02 // TEXTILES',
    title: 'MILL & FABRIC SOURCING',
    tagColor: 'bg-blue-600 text-white',
    iconType: 'spool',
    desktopPos: 'left-[35%] top-[12%] w-[265px]',
    points: [
      'Silk, virgin wool, linen & canvas swatches',
      'Weight, sheen & movement testing',
    ],
  },
  {
    step: '03',
    phase: 'STEP 03 // CONSTRUCTION',
    title: 'PATTERN & STAND DRAPING',
    tagColor: 'bg-amber-400 text-[#141413]',
    iconType: 'mannequin',
    desktopPos: 'right-[4%] top-[18%] w-[265px]',
    points: [
      'Custom block drafting & seam allowance',
      'Draped on dress form for balance',
    ],
  },
  {
    step: '04',
    phase: 'STEP 04 // FITTING',
    title: 'TOILE & FIRST FITTING',
    tagColor: 'bg-blue-600 text-white',
    iconType: 'shears',
    desktopPos: 'right-[12%] bottom-[8%] w-[275px]',
    points: [
      'Muslin/calico toile pin-fitting session',
      'Shoulder, waist & hem precision tweaks',
    ],
  },
  {
    step: '05',
    phase: 'STEP 05 // ATELIER FINISH',
    title: 'HAND-FINISHING & FITTING',
    tagColor: 'bg-[#FAF6EE] text-[#141413]',
    iconType: 'garment',
    desktopPos: 'left-[36%] bottom-[7%] w-[285px]',
    points: [
      'Hand-stitched hems, linings & closures',
      'Final steam press & garment bag delivery',
    ],
  },
];

function StepMotifIcon({ type }) {
  switch (type) {
    case 'sketch':
      return (
        <svg viewBox="0 0 36 36" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="none">
          <rect x="6" y="5" width="20" height="26" rx="2" fill="#FAF6EE" stroke="#141413" strokeWidth="2.5" />
          <path
            d="M11 12H21M11 17H19M22 25L30 17L32 19L24 27L21 28L22 25Z"
            fill="#2563EB"
            stroke="#141413"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'spool':
      return (
        <svg viewBox="0 0 36 36" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="none">
          <rect x="8" y="6" width="20" height="4" rx="1.5" fill="#F59E0B" stroke="#141413" strokeWidth="2.5" />
          <rect x="8" y="26" width="20" height="4" rx="1.5" fill="#F59E0B" stroke="#141413" strokeWidth="2.5" />
          <rect x="10" y="10" width="16" height="16" fill="#2563EB" stroke="#141413" strokeWidth="2.5" />
          <path d="M10 14L26 17M10 19L26 22" stroke="#FAF6EE" strokeWidth="2" />
        </svg>
      );
    case 'mannequin':
      return (
        <svg viewBox="0 0 36 36" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="none">
          <circle cx="18" cy="8" r="3.5" fill="#F59E0B" stroke="#141413" strokeWidth="2.2" />
          <path
            d="M11 15C14 13 22 13 25 15L23 25H13L11 15Z"
            fill="#2563EB"
            stroke="#141413"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M18 25V31M13 31H23" stroke="#141413" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'shears':
      return (
        <svg viewBox="0 0 36 36" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="none">
          <path d="M14 18L31 10L29 14L15 20L14 18Z" fill="#FAF6EE" stroke="#141413" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M14 20L31 27L29 23L15 18L14 20Z" fill="#FAF6EE" stroke="#141413" strokeWidth="2.2" strokeLinejoin="round" />
          <circle cx="9" cy="14" r="4" fill="#F59E0B" stroke="#141413" strokeWidth="2.2" />
          <circle cx="9" cy="24" r="4" fill="#2563EB" stroke="#141413" strokeWidth="2.2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 36 36" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="none">
          <path
            d="M18 5C19.8 5 21 6.2 21 7.8C21 9.2 19.8 10 18.5 10.6L29 16H25V30H11V16H7L17.5 10.6"
            fill="#F59E0B"
            stroke="#141413"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export default function DesignProcess() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const cleanup = initDesignProcessAnimations(containerRef, sectionRef);
    return cleanup;
  }, []);

  const handleBgError = (e) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <div ref={containerRef} id="process" className="relative w-full bg-[#FAF6EE] text-[#141413]">
      <section
        ref={sectionRef}
        className="relative w-full h-dvh md:h-screen overflow-hidden flex flex-col justify-between px-3.5 sm:px-8 md:px-12 py-3.5 sm:py-5 md:py-6 select-none bg-[#FAF6EE]"
      >
        {/* Fashion Atelier Atmospheric Backdrop */}
        <div className="process-backdrop absolute inset-0 z-0 overflow-hidden will-change-transform">
          {ATELIER_BG_IMAGE && (
            <img
              src={ATELIER_BG_IMAGE}
              alt=""
              aria-hidden="true"
              onError={handleBgError}
              className="w-full h-full object-cover object-center opacity-25 mix-blend-multiply"
            />
          )}

          {/* Warm Atelier + Cobalt Studio Wash */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 18% 22%, rgba(245, 158, 11, 0.24), transparent 42%), radial-gradient(circle at 82% 28%, rgba(37, 99, 235, 0.22), transparent 46%), linear-gradient(180deg, #FAF6EE 0%, #EFE8D8 52%, #DCE8FF 100%)',
            }}
          />

          {/* Subtle Tailoring Cutting-Mat Grid & Soft Drape Highlights */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(20, 20, 19, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 20, 19, 0.08) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="absolute -top-24 right-[10%] w-80 h-80 rounded-full bg-amber-300/35 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-28 left-[12%] w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        </div>

        {/* Top Row: Oversized Display Title + Top-Left Badge */}
        <div className="relative z-20 flex flex-row md:flex-row items-center md:items-start justify-between gap-2 sm:gap-3 shrink-0">
          <div className="process-badge self-start bg-[#FAF6EE] border-2 border-[#141413] shadow-[3px_3px_0px_#141413] sm:shadow-[4px_4px_0px_#141413] px-2.5 py-1.5 sm:px-3.5 sm:py-2 will-change-transform">
            <span className="font-mono text-[9px] sm:text-xs font-extrabold tracking-[0.18em] sm:tracking-[0.2em] uppercase flex items-center gap-1.5">
              <span>DESIGN PROCESS</span>
              <span className="text-blue-600 text-xs sm:text-sm leading-none">↗</span>
            </span>
          </div>

          <div className="process-hero-title text-right flex-1 will-change-transform">
            <h2 className="font-display font-black text-2xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-[0.92] text-[#141413]">
              DESIGN PROCESS
            </h2>
            <p className="font-mono text-[8px] sm:text-xs font-extrabold tracking-[0.16em] sm:tracking-[0.22em] uppercase text-blue-600 mt-0.5 sm:mt-1">
              FROM SKETCH TO FITTING 
            </p>
          </div>
        </div>

        {/* Desktop Winding Path + 5 Step Cards */}
        <div className="relative z-10 hidden md:block flex-1 w-full max-w-6xl mx-auto my-2">
          {/* Winding Road / Atelier Track */}
          <svg
            viewBox="0 0 1100 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Outer Neo-Brutalist Border */}
            <path
              className="process-road-path"
              d="M140 165 C 320 165, 360 115, 510 120 C 680 125, 760 140, 880 175 C 970 202, 950 355, 810 380 C 660 406, 560 390, 490 390"
              stroke="#141413"
              strokeWidth="34"
              strokeLinecap="round"
            />
            {/* Inner Alabaster Road Surface */}
            <path
              className="process-road-core"
              d="M140 165 C 320 165, 360 115, 510 120 C 680 125, 760 140, 880 175 C 970 202, 950 355, 810 380 C 660 406, 560 390, 490 390"
              stroke="#FAF6EE"
              strokeWidth="26"
              strokeLinecap="round"
            />
            {/* Center Dashed Stitch Line */}
            <path
              d="M140 165 C 320 165, 360 115, 510 120 C 680 125, 760 140, 880 175 C 970 202, 950 355, 810 380 C 660 406, 560 390, 490 390"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeDasharray="8 8"
              strokeLinecap="round"
            />
          </svg>

          {PROCESS_STEPS.map((item) => (
            <div
              key={item.step}
              className={`absolute ${item.desktopPos} flex flex-col gap-2`}
            >
              {/* Step Node Pill */}
              <div className="process-step-node self-start inline-flex items-center gap-2 bg-white border-2 border-[#141413] shadow-[3px_3px_0px_#141413] px-2.5 py-1 will-change-transform">
                <StepMotifIcon type={item.iconType} />
                <span className="font-mono text-[10px] font-extrabold tracking-[0.16em] uppercase">
                  {item.phase}
                </span>
              </div>

              {/* Step Card */}
              <article className="process-step-card bg-white border-2 border-[#141413] shadow-[5px_5px_0px_#141413] p-3.5 will-change-transform">
                <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-[#141413]/15">
                  <h3 className="font-display font-black text-sm lg:text-base uppercase tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <span
                    className={`font-mono text-[10px] font-extrabold px-2 py-0.5 border border-[#141413] rounded-full shrink-0 ${item.tagColor}`}
                  >
                    {item.step}
                  </span>
                </div>

                <ul className="mt-2 space-y-1 font-mono text-[11px] leading-snug text-[#141413]/85">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-black">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>

        {/* Mobile Stitched Vertical Flow (< 768px) */}
        <div className="relative z-10 md:hidden flex-1 w-full flex flex-col justify-between gap-1.5 my-2 overflow-hidden">
          {/* Vertical Stitched Connector Line */}
          <div
            aria-hidden="true"
            className="absolute left-[15px] top-3 bottom-3 w-[2px] border-l-2 border-dashed border-blue-600/80 pointer-events-none"
          />

          {PROCESS_STEPS.map((item) => (
            <div key={item.step} className="relative flex items-center gap-2.5 min-h-0">
              <div className="process-step-node relative z-10 w-8 h-8 rounded-full bg-white border-2 border-[#141413] shadow-[2px_2px_0px_#141413] flex items-center justify-center font-mono text-[11px] font-black shrink-0 will-change-transform">
                {item.step}
              </div>

              <article className="process-step-card flex-1 min-w-0 bg-white border-2 border-[#141413] shadow-[3px_3px_0px_#141413] px-2.5 py-1.5 will-change-transform">
                <div className="flex items-center justify-between gap-1.5">
                  <span
                    className={`font-mono text-[8px] font-extrabold px-1.5 py-0.5 border border-[#141413] rounded-full truncate ${item.tagColor}`}
                  >
                    {item.phase}
                  </span>
                  <StepMotifIcon type={item.iconType} />
                </div>

                <h3 className="font-display font-black text-xs uppercase tracking-tight leading-tight mt-0.5 truncate">
                  {item.title}
                </h3>

                <p className="font-mono text-[9.5px] leading-tight text-[#141413]/85 truncate mt-0.5">
                  {item.points[0]}
                </p>
              </article>
            </div>
          ))}
        </div>

        {/* Bottom Atelier Bar */}
        <div className="relative z-20 flex items-center justify-between font-mono text-[9px] sm:text-xs font-extrabold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#141413]/80 shrink-0">
          <span>BESPOKE ATELIER WORKFLOW</span>
          <span>05 STEPS</span>
        </div>
      </section>
    </div>
  );
}