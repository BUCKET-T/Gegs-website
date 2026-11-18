import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimations(containerRef, sectionRef) {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2500', // Scroll distance for the pinned sequence
        pin: true,
        scrub: 1, // Smooth scrub effect tied to scroll
        anticipatePin: 1,
      },
    });

    // Step 1: Wave background / container reveal
    tl.fromTo(
      sectionRef.current,
      { clipPath: 'circle(0% at 50% 50%)' },
      { clipPath: 'circle(150% at 50% 50%)', duration: 1.5, ease: 'power2.inOut' }
    )

    // Step 2: Emblem parallax rotation & scale entrance
    .fromTo(
      '.hero-emblem',
      { scale: 0.5, rotation: -45, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      '-=1.0'
    )

    // Step 3: Side typography slide in (Bespoke Tailoring & Artisanal Textiles)
    .fromTo(
      '.side-title-left',
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.8'
    )
    .fromTo(
      '.side-title-right',
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=1.0'
    )

    // Step 4: Interactive Petal Badges pop in sequentially
    .fromTo(
      '.petal-badge',
      { scale: 0, y: 20, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.6'
    )

    // Step 5: Climax zoom effect (Massive scale on emblem before transitioning out)
    .to(
      '.hero-emblem-container',
      { scale: 3.5, opacity: 0.9, duration: 1.5, ease: 'power2.in' },
      '+=0.5'
    );
  }, containerRef);

  return () => ctx.revert(); // Cleanup GSAP context on unmount
}