import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initLookbookAnimations(containerRef, sectionRef, trackRef) {
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    const setupTimeline = (scrollDistance, scissorTravelX, scissorPeakY) => {
      const track = trackRef.current;
      if (!track) return;

      const panels = gsap.utils.toArray('.lookbook-panel', track);
      const totalShift = Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.set('.lookbook-scissor', {
        x: 0,
        y: 0,
        rotation: -18,
        scale: 1,
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: sectionRef.current,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Horizontal scrub across all past-work panels
      tl.to(
        track,
        {
          x: -totalShift,
          ease: 'none',
          duration: 1,
        },
        0
      );

      // Scissor glides across the horizontal progression from work to work
      tl.to(
        '.lookbook-scissor',
        {
          x: scissorTravelX,
          y: scissorPeakY,
          rotation: 14,
          ease: 'sine.inOut',
          duration: 0.5,
        },
        0
      ).to(
        '.lookbook-scissor',
        {
          x: scissorTravelX * 1.45,
          y: 0,
          rotation: -10,
          ease: 'sine.inOut',
          duration: 0.5,
        },
        0.5
      );

      // Subtle card lift as each work enters view
      panels.forEach((panel) => {
        const card = panel.querySelector('.lookbook-card');
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 18, opacity: 0.88, force3D: true },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl,
              start: 'left 85%',
              end: 'left 45%',
              scrub: true,
            },
          }
        );
      });
    };

    // Mobile (< 640px)
    mm.add('(max-width: 639px)', () => {
      setupTimeline(2800, 140, -28);
    });

    // Desktop (>= 640px)
    mm.add('(min-width: 640px)', () => {
      setupTimeline(3800, 320, -48);
    });
  }, containerRef);

  return () => ctx.revert();
}