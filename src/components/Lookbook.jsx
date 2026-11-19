import { useEffect, useRef } from 'react';
import { initLookbookAnimations } from '../animations/LookbookMotion';

// Verify the exact file extensions inside src/assets/
import workLagoonSilkImg from '../assets/backiee-188651-landscape.jpg';
import workVictoriaWoolImg from '../assets/backiee-296651-landscape.jpg';
import workIndigoLinenImg from '../assets/wallpaperflare.com_wallpaper (2).jpg';
import workAtriumCoatImg from '../assets/pexels-mohit-hambiria-92377455-31396372.jpg';

const PAST_WORKS = [
  {
    id: '01',
    title: 'LAGOON DRAPE SET',
    category: 'BESPOKE // HAND-DRAPED',
    mill: 'Mill 02 — Como Silk',
    year: '2025',
    note: 'Structured shoulder line paired with fluid bias-cut trousers crafted in Lagos.',
    image: workLagoonSilkImg,
    accentClass: 'bg-amber-400',
  },
  {
    id: '02',
    title: 'ISLAND DOUBLE-BREASTED',
    category: 'BESPOKE // TAILORING',
    mill: 'Mill 05 — Biella Virgin Wool',
    year: '2025',
    note: 'Sharp peak lapels, horn buttons, and full canvas construction fitted by hand.',
    image: workVictoriaWoolImg,
    accentClass: 'bg-blue-600 text-white',
  },
  {
    id: '03',
    title: 'INDIGO STUDIO SHIRT',
    category: 'ARTISANAL // TEXTILES',
    mill: 'Mill 08 — Hand-Dyed Linen',
    year: '2025',
    note: 'Breathable washed linen with raw-edge placket details and boxy studio cut.',
    image: workIndigoLinenImg,
    accentClass: 'bg-[#FAF6EE]',
  },
  {
    id: '04',
    title: 'ATRIUM OVERCOAT',
    category: 'ARCHIVE // RUNWAY',
    mill: 'Mill 11 — Brushed Melton',
    year: '2025',
    note: 'Architectural longline silhouette cut for crisp movement and lasting structure.',
    image: workAtriumCoatImg,
    accentClass: 'bg-amber-400',
  },
];

function TailorScissorSvg({ className = '' }) {
  return (
    <svg
      viewBox="0 0 96 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Lower Blade */}
      <path
        d="M34 34L88 45L82 51L31 39L34 34Z"
        fill="#FAF6EE"
        stroke="#141413"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Upper Blade */}
      <path
        d="M34 29L88 15L84 22L35 34L34 29Z"
        fill="#FAF6EE"
        stroke="#141413"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Pivot Screw */}
      <circle cx="38" cy="33" r="3.5" fill="#F59E0B" stroke="#141413" strokeWidth="2.5" />
      {/* Top Handle Ring */}
      <ellipse
        cx="18"
        cy="21"
        rx="11"
        ry="7.5"
        transform="rotate(-18 18 21)"
        fill="#F59E0B"
        stroke="#141413"
        strokeWidth="3"
      />
      {/* Bottom Handle Ring */}
      <ellipse
        cx="19"
        cy="44"
        rx="11"
        ry="7.5"
        transform="rotate(16 19 44)"
        fill="#2563EB"
        stroke="#141413"
        strokeWidth="3"
      />
    </svg>
  );
}

export default function Lookbook() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const cleanup = initLookbookAnimations(containerRef, sectionRef, trackRef);
    return cleanup;
  }, []);

  const handleImageError = (e) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <div ref={containerRef} id="lookbook" className="relative w-full bg-[#FAF6EE] text-[#141413]">
      <section
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between py-4 sm:py-6 select-none bg-[#FAF6EE]"
      >
        {/* Top Centered Editorial Header */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-10 md:px-16 border-b-2 border-[#141413] pb-2.5 sm:pb-3 shrink-0">
          <div className="lookbook-title-group text-center will-change-[transform,opacity]">
            <span className="font-mono text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-blue-600 block">
              PAST WORKS // ARCHIVE
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-none mt-1">
              THE LOOKBOOK
            </h2>
          </div>
        </div>

        {/* Custom Scissor Anchored Inside Pinned Section */}
        <div className="lookbook-scissor absolute top-0 left-0 z-30 pointer-events-none will-change-transform">
          <TailorScissorSvg className="w-14 h-10 sm:w-20 sm:h-14 drop-shadow-[3px_3px_0px_#141413]" />
        </div>

        {/* Horizontal Scrub Track */}
        <div className="relative flex-1 w-full flex items-center overflow-hidden py-2">
          <div
            ref={trackRef}
            className="flex items-stretch gap-5 sm:gap-7 px-4 sm:px-10 md:px-16 will-change-transform"
          >
            {PAST_WORKS.map((item) => (
              <article
                key={item.id}
                className="lookbook-panel shrink-0 w-[82vw] sm:w-[380px] md:w-[420px] pr-2 pb-2 flex"
              >
                <div className="lookbook-card w-full bg-white border-2 border-[#141413] shadow-[4px_4px_0px_#141413] sm:shadow-[6px_6px_0px_#141413] flex flex-col justify-between overflow-hidden will-change-[transform,opacity]">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between px-3.5 py-2 border-b-2 border-[#141413] font-mono text-[10px] sm:text-xs font-extrabold tracking-wider shrink-0">
                    <span>NO. {item.id}</span>
                    <span className={`px-2.5 py-0.5 border border-[#141413] rounded-full ${item.accentClass}`}>
                      {item.year}
                    </span>
                  </div>

                  {/* Past Work Image */}
                  <div className="relative w-full h-36 sm:h-44 md:h-48 bg-blue-600/10 border-b-2 border-[#141413] overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={handleImageError}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Editorial Details */}
                  <div className="p-3.5 sm:p-5 flex flex-col justify-between flex-1 gap-2">
                    <div>
                      <p className="font-mono text-[10px] font-extrabold tracking-[0.2em] uppercase text-blue-600">
                        {item.category}
                      </p>
                      <h3 className="font-display font-black text-lg sm:text-2xl uppercase tracking-tight mt-0.5 leading-tight">
                        {item.title}
                      </h3>
                      <p className="font-serif italic text-xs sm:text-[13px] text-[#141413]/80 mt-1.5 leading-snug">
                        {item.note}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-[#141413]/20 flex items-center justify-between font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider shrink-0">
                      <span>{item.mill}</span>
                      <span className="text-blue-600">GEGS STUDIO</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Status Strip */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-10 md:px-16 pt-1 flex items-center justify-between font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-[#141413]/75 shrink-0">
          <span>THE OGUN ATELIER</span>
          <span>04 ARCHIVE PIECES</span>
        </div>
      </section>
    </div>
  );
}