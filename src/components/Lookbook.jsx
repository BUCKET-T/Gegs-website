import { useEffect, useRef } from 'react';
import { initLookbookAnimations } from '../animations/LookbookMotion';

// Update these filenames to match your images inside src/assets/
import workLagoonSilkImg from '../assets/backiee-188651-landscape.jpg';
import workVictoriaWoolImg from '../assets/bmw-m4-gt3-evo-bmw-7680x4320-16968.jpg';
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

  return (
    <div ref={containerRef} id="lookbook" className="relative w-full bg-[#FAF6EE] text-[#141413]">
      <section
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between py-6 sm:py-10 select-none bg-[#FAF6EE]"
      >
        {/* Top Editorial Header + Gliding Scissor */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-10 md:px-16 flex items-center justify-between border-b-2 border-[#141413] pb-3 sm:pb-4">
          <div>
            <span className="font-mono text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-blue-600 block">
              PAST WORKS // ARCHIVE
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-none mt-1">
              THE LOOKBOOK
            </h2>
          </div>

          {/* Custom Scissor Motif Gliding Across Works on Scroll */}
          <div className="lookbook-scissor relative z-30 pointer-events-none will-change-transform">
            <TailorScissorSvg className="w-16 h-11 sm:w-24 sm:h-16 drop-shadow-[3px_3px_0px_#141413]" />
          </div>

          <div className="hidden sm:block text-right font-mono text-xs font-extrabold tracking-widest uppercase">
            SCROLL &rarr;
          </div>
        </div>

        {/* Horizontal Scrub Track */}
        <div className="relative flex-1 w-full flex items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-stretch gap-5 sm:gap-8 px-4 sm:px-10 md:px-16 will-change-transform"
          >
            {PAST_WORKS.map((item) => (
              <article
                key={item.id}
                className="lookbook-panel shrink-0 w-[82vw] sm:w-[420px] md:w-[460px] flex"
              >
                <div className="lookbook-card w-full bg-white border-2 border-[#141413] shadow-[5px_5px_0px_#141413] sm:shadow-[7px_7px_0px_#141413] flex flex-col justify-between overflow-hidden will-change-[transform,opacity]">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b-2 border-[#141413] font-mono text-[10px] sm:text-xs font-extrabold tracking-wider">
                    <span>NO. {item.id}</span>
                    <span className={`px-2.5 py-0.5 border border-[#141413] rounded-full ${item.accentClass}`}>
                      {item.year}
                    </span>
                  </div>

                  {/* Past Work Image */}
                  <div className="relative w-full h-56 sm:h-72 bg-blue-600/10 border-b-2 border-[#141413] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Editorial Details */}
                  <div className="p-4 sm:p-6 flex flex-col justify-between flex-1 gap-3">
                    <div>
                      <p className="font-mono text-[10px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-blue-600">
                        {item.category}
                      </p>
                      <h3 className="font-display font-black text-xl sm:text-3xl uppercase tracking-tight mt-1 leading-tight">
                        {item.title}
                      </h3>
                      <p className="font-serif italic text-xs sm:text-sm text-[#141413]/80 mt-2">
                        {item.note}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#141413]/20 flex items-center justify-between font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
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
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-10 md:px-16 pt-2 flex items-center justify-between font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-[#141413]/75">
          <span>LAGOS ISLAND ATELIER</span>
          <span>04 ARCHIVE PIECES</span>
        </div>
      </section>
    </div>
  );
}