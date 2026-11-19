import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initDesignProcessAnimations(containerRef, sectionRef) {
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    const setupTimeline = ({
      scrollDistance,
      scrubAmount,
      pathDrawStart,
      cardStagger,
      cardOffsetY = 26,
    }) => {
      const section = sectionRef.current;
      if (!section) return;

      const backdrop = section.querySelector('.process-backdrop');
      const heroTitle = section.querySelector('.process-hero-title');
      const badge = section.querySelector('.process-badge');
      const roadPath = section.querySelector('.process-road-path');
      const roadCore = section.querySelector('.process-road-core');
      const nodes = gsap.utils.toArray('.process-step-node', section);
      const cards = gsap.utils.toArray('.process-step-card', section);

      [roadPath, roadCore].forEach((el) => {
        if (!el || typeof el.getTotalLength !== 'function') return;
        const length = el.getTotalLength();
        gsap.set(el, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      gsap.set(backdrop, {
        scale: 0.72,
        opacity: 0.35,
        borderRadius: '28px',
        force3D: true,
      });

      gsap.set(heroTitle, {
        y: 36,
        opacity: 0.15,
        scale: 0.96,
        force3D: true,
      });

      gsap.set(badge, {
        y: -18,
        x: -18,
        opacity: 0,
        scale: 0.92,
        force3D: true,
      });

      gsap.set(nodes, {
        scale: 0.5,
        opacity: 0,
        force3D: true,
      });

      gsap.set(cards, {
        y: cardOffsetY,
        opacity: 0,
        scale: 0.95,
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: section,
          scrub: scrubAmount,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Oversized title settles in as the studio backdrop expands open
      tl.to(
        heroTitle,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: 'power3.out',
        },
        0
      );

      tl.to(
        backdrop,
        {
          scale: 1,
          opacity: 1,
          borderRadius: '0px',
          duration: 0.28,
          ease: 'power2.inOut',
        },
        0.04
      );

      // 2. Top-left neo-brutalist badge snaps into place
      tl.to(
        badge,
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.14,
          ease: 'back.out(1.5)',
        },
        0.2
      );

      // 3. Winding / stitched path traces across the 5 design steps
      [roadPath, roadCore].forEach((el) => {
        if (!el || typeof el.getTotalLength !== 'function') return;
        tl.to(
          el,
          {
            strokeDashoffset: 0,
            duration: 0.58,
            ease: 'none',
          },
          pathDrawStart
        );
      });

      // 4. Each step node and card reveals sequentially along the track
      const totalSteps = Math.max(1, cards.length);
      cards.forEach((card, index) => {
        const stepOffset = pathDrawStart + (index / totalSteps) * cardStagger;
        const node = nodes[index];

        if (node) {
          tl.to(
            node,
            {
              scale: 1,
              opacity: 1,
              duration: 0.08,
              ease: 'back.out(1.7)',
            },
            stepOffset
          );
        }

        tl.to(
          card,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.12,
            ease: 'power2.out',
          },
          stepOffset + 0.02
        );
      });
    };

    // Desktop (>= 768px): preserved working desktop motion
    mm.add('(min-width: 768px)', () => {
      setupTimeline({
        scrollDistance: 4400,
        scrubAmount: 1.4,
        pathDrawStart: 0.26,
        cardStagger: 0.54,
        cardOffsetY: 26,
      });
    });

    // Mobile (< 768px): smooth vertical stitched progression tailored to mobile viewports
    mm.add('(max-width: 767px)', () => {
      setupTimeline({
        scrollDistance: 3600,
        scrubAmount: 1.25,
        pathDrawStart: 0.22,
        cardStagger: 0.62,
        cardOffsetY: 18,
      });
    });
  }, containerRef);

  return () => ctx.revert();
}