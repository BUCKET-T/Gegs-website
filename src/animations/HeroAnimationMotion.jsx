import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimations(containerRef, sectionRef) {
  const ctx = gsap.context(() => {
    const isMobile = window.innerWidth < 640;

    // Initial states
    gsap.set('.side-title-left', { x: isMobile ? -30 : -60, opacity: 0, force3D: true });
    gsap.set('.side-title-right', { x: isMobile ? 30 : 60, opacity: 0, force3D: true });
    gsap.set('.hero-emblem-container', { scale: 1, rotation: 0, opacity: 1, force3D: true, transformOrigin: 'center center' });
    
    // Start badges clustered at the center
    gsap.set('.petal-badge', { x: 0, y: 0, scale: 0, opacity: 0, force3D: true });
    gsap.set('.flash-overlay', { opacity: 0, pointerEvents: 'none', force3D: true });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: isMobile ? '+=3200' : '+=4000',
        pin: sectionRef.current,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Step 1: Side titles slide in
    tl.to('.side-title-left', { x: 0, opacity: 1, duration: 1, ease: 'power2.out' })
      .to('.side-title-right', { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }, '<')
      
      // Step 2: Petal badges blossom OUTWARD with responsive desktop vs mobile spreads
      .to('.badge-top-left', { 
        x: isMobile ? -45 : -220, 
        y: isMobile ? -55 : -130, 
        scale: 1, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'back.out(1.7)' 
      }, '+=0.1')

      .to('.badge-top-right', { 
        x: isMobile ? 45 : 220, 
        y: isMobile ? -55 : -130, 
        scale: 1, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'back.out(1.7)' 
      }, '+=0.15')

      .to('.badge-bottom-left', { 
        x: isMobile ? -45 : -220, 
        y: isMobile ? 55 : 130, 
        scale: 1, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'back.out(1.7)' 
      }, '+=0.15')

      .to('.badge-bottom-right', { 
        x: isMobile ? 45 : 220, 
        y: isMobile ? 55 : 130, 
        scale: 1, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'back.out(1.7)' 
      }, '+=0.15')

      // Step 3: Fade out text elements before zoom
      .to(['.side-title-left', '.side-title-right', '.hero-footer', '.top-subtitle', '.petal-badge'], {
        opacity: 0,
        duration: 0.6,
        ease: 'power1.out',
      }, '+=0.4')

      // Step 4: Massive Zoom and Bright Light Flash Segue
      .to('.hero-emblem-container', {
        scale: isMobile ? 25 : 15,
        duration: 1.5,
        ease: 'power2.in',
      }, '-=0.2')
      .to('.flash-overlay', {
        opacity: 1,
        duration: 0.8,
        ease: 'power1.inOut',
      }, '-=0.8');

  }, containerRef);

  return () => ctx.revert();
}