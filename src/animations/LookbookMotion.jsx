import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initLookbookAnimations(containerRef, sectionRef, trackRef) {
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    const buildTimeline = ({
      scrollDistance,
      scrubSmoothing,
      startX,
      startY,
      flightStart,
      trackExtraPadding,
      points,
    }) => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const scissor = section?.querySelector('.lookbook-scissor');
      if (!section || !track || !scissor) return;

      const panels = gsap.utils.toArray('.lookbook-panel', track);
      const totalShift = Math.max(0, track.scrollWidth - section.clientWidth + trackExtraPadding);

      // Centered lookbook title initial state
      gsap.set('.lookbook-title-group', {
        opacity: 0,
        y: 22,
        scale: 0.96,
        force3D: true,
      });

      // Cards start recessed/unhighlighted so each one dynamically pops when scrolled into focus
      panels.forEach((panel) => {
        const card = panel.querySelector('.lookbook-card');
        if (!card) return;
        gsap.set(card, {
          opacity: 0.72,
          y: 18,
          scale: 0.96,
          force3D: true,
        });
      });

      // Start scissor at the lower-left spot and hold until reveal progresses
      gsap.set(scissor, {
        x: startX,
        y: startY,
        rotation: -28,
        scale: 1,
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: section,
          scrub: scrubSmoothing,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Title pops up first in the center
      tl.to(
        '.lookbook-title-group',
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.14,
          ease: 'back.out(1.4)',
        },
        0
      );

      // 2. First work pops in slowly after the title
      const firstCard = panels[0]?.querySelector('.lookbook-card');
      if (firstCard) {
        tl.to(
          firstCard,
          {
            opacity: 1,
            y: -6,
            scale: 1.02,
            duration: 0.16,
            ease: 'power2.out',
          },
          0.14
        );
      }

      // 3. Second work pops in slowly after the first
      const secondCard = panels[1]?.querySelector('.lookbook-card');
      if (secondCard) {
        tl.to(
          secondCard,
          {
            opacity: 1,
            y: -6,
            scale: 1.02,
            duration: 0.16,
            ease: 'power2.out',
          },
          0.3
        );
      }

      // 4. Horizontal track scrub across works
      tl.to(
        track,
        {
          x: -totalShift,
          duration: 0.62,
          ease: 'none',
        },
        0.38
      );

      // 5. Dynamic spotlight pop for EVERY card as it enters and crosses the active focus band
      panels.forEach((panel, index) => {
        const card = panel.querySelector('.lookbook-card');
        if (!card) return;

        const focusTl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tl,
            start: index < 2 ? 'center 75%' : 'left 88%',
            end: 'right 18%',
            scrub: true,
          },
        });

        focusTl
          .to(card, {
            opacity: 1,
            y: -10,
            scale: 1.035,
            boxShadow: '10px 10px 0px #141413',
            borderColor: '#141413',
            duration: 0.45,
            ease: 'power2.out',
          })
          .to(card, {
            opacity: 0.78,
            y: 8,
            scale: 0.965,
            boxShadow: '4px 4px 0px #141413',
            duration: 0.55,
            ease: 'power2.inOut',
          });
      });

      // 6. Delay scissor flight until reveal is ~quarter to halfway open, then glide along path
      const availableSpan = Math.max(0.2, 0.98 - flightStart);
      const segDuration = availableSpan / points.length;

      points.forEach((pt, idx) => {
        tl.to(
          scissor,
          {
            x: pt.x,
            y: pt.y,
            rotation: pt.rotation,
            duration: segDuration,
            ease: 'sine.inOut',
          },
          flightStart + idx * segDuration
        );
      });
    };

    // Mobile (< 640px) — tuned for narrow widths & shorter mobile heights
    mm.add('(max-width: 639px)', () => {
      const w = sectionRef.current?.clientWidth || window.innerWidth;
      const h = sectionRef.current?.clientHeight || window.innerHeight;
      const maxX = Math.max(40, w - 76);

      buildTimeline({
        scrollDistance: 4200,
        scrubSmoothing: 1.6,
        startX: 16,
        startY: Math.max(120, h - 135),
        flightStart: 0.34,
        trackExtraPadding: 36,
        points: [
          { x: Math.min(maxX, w * 0.32), y: h * 0.45, rotation: -18 },
          { x: Math.min(maxX, w * 0.54), y: h * 0.24, rotation: 14 },
          { x: Math.min(maxX, w * 0.38), y: h * 0.64, rotation: -22 },
          { x: maxX, y: h * 0.36, rotation: 8 },
        ],
      });
    });

    // Desktop (>= 640px) — preserved working desktop motion + dynamic card spotlight
    mm.add('(min-width: 640px)', () => {
      const w = sectionRef.current?.clientWidth || window.innerWidth;
      const h = sectionRef.current?.clientHeight || window.innerHeight;

      buildTimeline({
        scrollDistance: 5400,
        scrubSmoothing: 1.75,
        startX: 72,
        startY: h - 155,
        flightStart: 0.3,
        trackExtraPadding: 64,
        points: [
          { x: w * 0.34, y: h * 0.44, rotation: -22 },
          { x: w * 0.58, y: h * 0.23, rotation: 16 },
          { x: w * 0.52, y: h * 0.68, rotation: -28 },
          { x: w * 0.78, y: h * 0.42, rotation: 10 },
        ],
      });
    });
  }, containerRef);

  return () => ctx.revert();
}