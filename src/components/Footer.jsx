import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gegsEmblem from '../assets/icon/gegs-emblem.svg';
import {
  footerRevealMotion,
  wovenTagVariants,
  threadPullButtonMotion,
  backToTopMotion,
  animateTapeSlide,
} from '../animations/FooterMotion';

const MAX_CM = 150;
const TICK_COUNT = 76; // 0 to 150 in 2cm increments
const MOBILE_TAPE_WIDTH = 900; // px scrollable/draggable tape length on mobile

const NAV_LINKS = [
  { label: 'LOOKBOOK', href: '#lookbook' },
  { label: 'DESIGN PROCESS', href: '#process' },
  { label: 'CONSULTATION', href: '#contact' },
];

export default function Footer() {
  const rulerRef = useRef(null);
  const mobileTrackRef = useRef(null);
  const dragStartRef = useRef({ active: false, startX: 0, startOffset: 0 });

  const [measureCm, setMeasureCm] = useState(88.5);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [isDetached, setIsDetached] = useState(false);
  const [mobileOffsetPx, setMobileOffsetPx] = useState(() => {
    const ratio = 88.5 / MAX_CM;
    return -ratio * MOBILE_TAPE_WIDTH;
  });

  const syncCmFromMobileOffset = (nextOffset) => {
    const clamped = Math.max(-MOBILE_TAPE_WIDTH, Math.min(0, nextOffset));
    setMobileOffsetPx(clamped);
    const ratio = Math.abs(clamped) / MOBILE_TAPE_WIDTH;
    setMeasureCm(Number((ratio * MAX_CM).toFixed(1)));
  };

  useEffect(() => {
    animateTapeSlide(mobileTrackRef.current, mobileOffsetPx);
  }, [mobileOffsetPx]);

  // Desktop pointer sweep across the full tape
  const updateMeasurementFromDesktopX = (clientX) => {
    const el = rulerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const cm = Number((ratio * MAX_CM).toFixed(1));
    setMeasureCm(cm);
    setMobileOffsetPx(-ratio * MOBILE_TAPE_WIDTH);
  };

  // Mobile touch/pointer drag on the tape itself
  const handleMobilePointerDown = (e) => {
    setIsMeasuring(true);
    dragStartRef.current = {
      active: true,
      startX: e.clientX,
      startOffset: mobileOffsetPx,
    };
  };

  const handleMobilePointerMove = (e) => {
    if (!dragStartRef.current.active) return;
    const deltaX = e.clientX - dragStartRef.current.startX;
    syncCmFromMobileOffset(dragStartRef.current.startOffset + deltaX);
  };

  const handleMobilePointerUp = () => {
    dragStartRef.current.active = false;
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const measureInches = (measureCm / 2.54).toFixed(1);
  const desktopMarkerPercent = Math.min(100, Math.max(0, (measureCm / MAX_CM) * 100));

  return (
    <footer className="relative w-full bg-[#FAF6EE] text-[#141413] border-t-[3px] border-[#141413] select-none overflow-x-clip">
      {/* MOBILE (< 640px): Physical Movable / Slidable Measuring Tape */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Slide tailor measuring tape to read measurement in centimeters"
        aria-valuemin={0}
        aria-valuemax={MAX_CM}
        aria-valuenow={Math.round(measureCm)}
        onPointerDown={handleMobilePointerDown}
        onPointerMove={handleMobilePointerMove}
        onPointerUp={handleMobilePointerUp}
        onPointerCancel={handleMobilePointerUp}
        onPointerLeave={() => {
          handleMobilePointerUp();
          setIsMeasuring(false);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') syncCmFromMobileOffset(mobileOffsetPx - (1 / MAX_CM) * MOBILE_TAPE_WIDTH);
          if (e.key === 'ArrowLeft') syncCmFromMobileOffset(mobileOffsetPx + (1 / MAX_CM) * MOBILE_TAPE_WIDTH);
        }}
        className="sm:hidden relative w-full h-16 bg-amber-400 border-b-[3px] border-[#141413] cursor-grab active:cursor-grabbing touch-none overflow-hidden focus:outline-none"
      >
        {/* Sliding Tape Strip */}
        <div
          ref={mobileTrackRef}
          style={{ width: `${MOBILE_TAPE_WIDTH}px`, marginLeft: '50%' }}
          className="relative h-full flex items-start justify-between will-change-transform"
        >
          {Array.from({ length: TICK_COUNT }, (_, idx) => {
            const cmVal = idx * 2;
            const isMajor = cmVal % 10 === 0;
            const isMid = cmVal % 5 === 0 && !isMajor;
            return (
              <div key={cmVal} className="flex flex-col items-center shrink-0">
                <span
                  className={`w-[2px] bg-[#141413] ${
                    isMajor ? 'h-7' : isMid ? 'h-5' : 'h-3'
                  }`}
                />
                {isMajor && (
                  <span className="font-mono text-[10px] font-black tracking-tighter mt-1 text-[#141413]">
                    {cmVal}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Fixed Center Cobalt Needle & Live Readout */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
          <div className="w-[3px] h-full bg-blue-600" />
          <div className="absolute bottom-1.5 px-2.5 py-0.5 rounded-full bg-[#141413] text-[#FAF6EE] border border-[#FAF6EE] shadow-[2px_2px_0px_#2563EB] font-mono text-[10px] font-extrabold whitespace-nowrap">
            {measureCm.toFixed(1)} CM // {measureInches} IN
          </div>
        </div>

        {!isMeasuring && (
          <div className="absolute left-2.5 bottom-1.5 px-2 py-0.5 rounded-full bg-[#FAF6EE] border border-[#141413] font-mono text-[9px] font-extrabold uppercase tracking-[0.12em] pointer-events-none z-10">
            DRAG TAPE ↔
          </div>
        )}
      </div>

      {/* DESKTOP (>= 640px): Interactive Tailor's Measuring Tape Ruler */}
      <div
        ref={rulerRef}
        role="slider"
        tabIndex={0}
        aria-label="Interactive tailor measuring tape in centimeters"
        aria-valuemin={0}
        aria-valuemax={MAX_CM}
        aria-valuenow={Math.round(measureCm)}
        onPointerMove={(e) => {
          setIsMeasuring(true);
          updateMeasurementFromDesktopX(e.clientX);
        }}
        onPointerDown={(e) => {
          setIsMeasuring(true);
          updateMeasurementFromDesktopX(e.clientX);
        }}
        onPointerLeave={() => setIsMeasuring(false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') setMeasureCm((prev) => Math.min(MAX_CM, Number((prev + 1).toFixed(1))));
          if (e.key === 'ArrowLeft') setMeasureCm((prev) => Math.max(0, Number((prev - 1).toFixed(1))));
        }}
        className="hidden sm:block relative w-full h-16 bg-charcoal border-b-[3px] border-[#141413] cursor-ew-resize overflow-hidden focus:outline-none focus:ring-2 focus:none"
      >
        <div className="absolute inset-x-0 top-0 h-full flex items-start justify-between px-4 pointer-events-none">
          {Array.from({ length: TICK_COUNT }, (_, idx) => {
            const cmVal = idx * 2;
            const isMajor = cmVal % 10 === 0;
            const isMid = cmVal % 5 === 0 && !isMajor;
            return (
              <div key={cmVal} className="flex flex-col items-center">
                <span
                  className={`w-[2px] bg-[#f5f5f3] ${
                    isMajor ? 'h-7' : isMid ? 'h-5' : 'h-3'
                  }`}
                />
                {isMajor && (
                  <span className="font-mono text-[10px] font-black tracking-tighter mt-1 text-[#dfdfdb]">
                    {cmVal}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{ left: `${desktopMarkerPercent}%` }}
          className="absolute top-0 bottom-0 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-[left] duration-75 ease-out"
        >
          <div className="w-[3px] h-full bg-blue-600" />
          <div className="absolute bottom-1.5 px-2.5 py-0.5 rounded-full bg-[#141413] text-[#FAF6EE] border border-[#FAF6EE] shadow-[2px_2px_0px_#2563EB] font-mono text-xs font-extrabold whitespace-nowrap">
            {measureCm.toFixed(1)} CM // {measureInches} IN
          </div>
        </div>

        {!isMeasuring && (
          <div className="flex absolute right-4 bottom-1.5 items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF6EE] border border-[#141413] font-mono text-[10px] font-extrabold uppercase tracking-[0.14em] pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>SLIDE TO MEASURE</span>
          </div>
        )}
      </div>

      {/* Main Atelier Footer Body */}
      <motion.div
        {...footerRevealMotion}
        className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Interactive "Pull Thread / Detach Tag" Woven Garment Label */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="font-mono text-[10px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-[#141413]/80">
                WOVEN ATELIER LABEL // NO. 001-OGUN
              </span>

              <motion.button
                type="button"
                onClick={() => setIsDetached((prev) => !prev)}
                {...threadPullButtonMotion}
                className="px-3.5 py-1.5 rounded-full bg-white border-2 border-[#141413] shadow-[3px_3px_0px_#141413] font-mono text-[10px] sm:text-xs font-extrabold tracking-[0.16em] uppercase flex items-center gap-2 cursor-pointer"
              >
                <span className="text-blue-600">✂</span>
                <span>{isDetached ? 'RE-STITCH TAG' : 'PULL THREAD'}</span>
              </motion.button>
            </div>

            <motion.div
              variants={wovenTagVariants}
              animate={isDetached ? 'detached' : 'stitched'}
              onClick={() => setIsDetached((prev) => !prev)}
              title="Click to pull thread & snap label"
              className="relative bg-white rounded-2xl border-[2.5px] border-[#141413] shadow-[7px_7px_0px_#141413] p-5 sm:p-6 cursor-pointer"
            >
              <div
                className={`w-full border-t-[3px] border-dashed transition-colors duration-300 mb-4 ${
                  isDetached ? 'border-amber-500 opacity-35' : 'border-blue-600'
                }`}
              />

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FAF6EE] border-2 border-[#141413] shadow-[3px_3px_0px_#141413] flex items-center justify-center shrink-0 p-2">
                    <img
                      src={gegsEmblem}
                      alt="GEGS Atelier Emblem"
                      className="w-full h-full object-contain contrast-125"
                    />
                  </div>

                  <div>
                    <p className="font-mono text-[10px] font-extrabold tracking-[0.22em] uppercase text-blue-600">
                      {isDetached ? 'THREAD UNRAVELED // TAG LOOSE' : 'HAND-STITCHED IN NIGERIA'}
                    </p>
                    <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter leading-none mt-1 text-[#141413]">
                      GEGS
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    title="Bespoke Hand-Draped"
                    className="w-9 h-9 rounded-lg bg-[#FAF6EE] border-2 border-[#141413] flex items-center justify-center font-mono text-xs font-black"
                  >
                    ◈
                  </span>
                  <span
                    title="Dry Clean Only"
                    className="w-9 h-9 rounded-lg bg-amber-400 border-2 border-[#141413] flex items-center justify-center font-mono text-xs font-black"
                  >
                    P
                  </span>
                  <span
                    title="Atelier Steam Finish"
                    className="w-9 h-9 rounded-lg bg-blue-600 text-white border-2 border-[#141413] flex items-center justify-center font-mono text-xs font-black"
                  >
                    ♨
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-[#141413]/15 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] font-bold text-[#141413]/85">
                <span>100% BESPOKE SILHOUETTES</span>
                <span>CUT TO MEASURE // OGUN STATE</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Studio Coordinates, Navigation & Back to Top */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6 lg:pl-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="font-mono text-[11px] font-extrabold tracking-[0.22em] uppercase text-[#141413]/75 mb-3">
                  ATELIER INDEX
                </p>
                <ul className="space-y-2.5">
                  {NAV_LINKS.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-2 font-display font-black text-xl sm:text-2xl uppercase tracking-tight hover:text-blue-600 transition-colors"
                      >
                        <span>{link.label}</span>
                        <span className="text-sm font-mono">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-[11px] font-extrabold tracking-[0.22em] uppercase text-[#141413]/75 mb-3">
                  OGUN FLAGSHIP
                </p>
                <address className="not-italic font-serif italic text-base sm:text-lg leading-snug text-[#141413]">
                  14 Adeola Odeku Street,
                  <br />
                  Mowe, Ogun State.
                </address>
                <p className="font-mono text-[11px] font-bold text-[#141413]/80 mt-3">
                  MON–FRI: 07:00 – 20:00
                  <br />
                  SAT: 10:00 – 14:00
                </p>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-[#141413] flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono text-[11px] font-extrabold tracking-[0.16em] uppercase text-[#141413]/80">
                © {new Date().getFullYear()} GEGS STUDIO. ALL RIGHTS RESERVED.
              </p>

              <motion.button
                type="button"
                onClick={handleBackToTop}
                {...backToTopMotion}
                className="px-5 py-2.5 rounded-full bg-[#141413] text-[#FAF6EE] border-2 border-[#141413] shadow-[4px_4px_0px_#141413] font-mono text-xs font-extrabold tracking-[0.18em] uppercase flex items-center gap-2 cursor-pointer"
              >
                <span>BACK TO TOP</span>
                <span aria-hidden="true">↑</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}