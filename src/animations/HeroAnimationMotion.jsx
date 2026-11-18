import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimations(containerRef, sectionRef) {
  const ctx = gsap.context(() => {
    // Initial setup for all elements
    gsap.set('.side-title-left', { opacity: 0, force3D: true });
    gsap.set('.side-title-right', { opacity: 0, force3D: true });
    gsap.set('.hero-emblem-container', { scale: 1, rotation: 0, opacity: 1, force3D: true, transformOrigin: 'center center' });
    gsap.set('.petal-badge', { x: 0, y: 0, scale: 0, opacity: 0, force3D: true });
    gsap.set('.flash-overlay', { opacity: 0, pointerEvents: 'none', force3D: true });

    const mm = gsap.matchMedia();

    // MOBILE VIEWPORT MATCH (< 640px)
    mm.add('(max-width: 639px)', () => {
      gsap.set('.side-title-left', { x: -30 });
      gsap.set('.side-title-right', { x: 30 });

      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3200',
          pin: sectionRef.current,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      mobileTl
        .to('.side-title-left', { x: 0, opacity: 1, duration: 1, ease: 'power2.out' })
        .to('.side-title-right', { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }, '<')
        .to('.badge-top-left', { x: -45, y: -55, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }, '+=0.1')
        .to('.badge-top-right', { x: 45, y: -55, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }, '+=0.15')
        .to('.badge-bottom-left', { x: -45, y: 55, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }, '+=0.15')
        .to('.badge-bottom-right', { x: 45, y: 55, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }, '+=0.15')
        .to(['.side-title-left', '.side-title-right', '.hero-footer', '.top-subtitle', '.petal-badge'], { opacity: 0, duration: 0.6, ease: 'power1.out' }, '+=0.4')
        .to('.hero-emblem-container', { scale: 25, duration: 1.5, ease: 'power2.in' }, '-=0.2')
        .to('.flash-overlay', { opacity: 1, duration: 0.8, ease: 'power1.inOut' }, '-=0.8');
    });

    // DESKTOP VIEWPORT MATCH (>= 640px)
    mm.add('(min-width: 640px)', () => {
      gsap.set('.side-title-left', { x: -60 });
      gsap.set('.side-title-right', { x: 60 });

      const desktopTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=4200',
          pin: sectionRef.current,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      desktopTl
        .to('.side-title-left', { x: 0, opacity: 1, duration: 1, ease: 'power2.out' })
        .to('.side-title-right', { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }, '<')
        .to('.badge-top-left', { x: -380, y: -180, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }, '+=0.1')
        .to('.badge-top-right', { x: 380, y: -180, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }, '+=0.15')
        .to('.badge-bottom-left', { x: -380, y: 180, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }, '+=0.15')
        .to('.badge-bottom-right', { x: 380, y: 180, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }, '+=0.15')
        .to(['.side-title-left', '.side-title-right', '.hero-footer', '.top-subtitle', '.petal-badge'], { opacity: 0, duration: 0.6, ease: 'power1.out' }, '+=0.4')
        .to('.hero-emblem-container', { scale: 15, duration: 1.5, ease: 'power2.in' }, '-=0.2')
        .to('.flash-overlay', { opacity: 1, duration: 0.8, ease: 'power1.inOut' }, '-=0.8');
    });

  }, containerRef);

  return () => ctx.revert();
}