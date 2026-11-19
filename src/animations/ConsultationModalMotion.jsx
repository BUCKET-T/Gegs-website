import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ATELIER_EASE = [0.22, 1, 0.36, 1];

export const modalBackdropMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.45, ease: ATELIER_EASE },
};

export const followStudioMotion = {
  initial: { opacity: 0, x: -90 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.85, ease: ATELIER_EASE },
};

export const inquiryCardMotion = {
  initial: { opacity: 0, y: 105 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1.05, delay: 0.25, ease: ATELIER_EASE },
};

export const availabilityCardMotion = {
  initial: { opacity: 0, x: 110 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1.25, delay: 0.55, ease: ATELIER_EASE },
};

export const socialPillMotion = {
  whileHover: { x: 3, y: -2, boxShadow: '6px 6px 0px #141413' },
  whileTap: { x: 2, y: 2, boxShadow: '2px 2px 0px #141413' },
  transition: { type: 'spring', stiffness: 420, damping: 28 },
};

export const submitButtonMotion = {
  whileHover: { y: -2, boxShadow: '6px 6px 0px #2563EB' },
  whileTap: { x: 2, y: 2, boxShadow: '2px 2px 0px #141413' },
  transition: { type: 'spring', stiffness: 420, damping: 28 },
};

export const dropdownMenuMotion = {
  initial: { opacity: 0, y: -8, scale: 0.98 },
  animate: { opacity: 1, y: 4, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.98 },
  transition: { duration: 0.18, ease: ATELIER_EASE },
};

export function initConsultationModalAnimations(sectionRef, topRibbonTrackRef, bottomRibbonTrackRef) {
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    const createRibbons = ({ topStart, topEnd, bottomStart, bottomEnd, scrub }) => {
      const section = sectionRef.current;
      const topTrack = topRibbonTrackRef.current;
      const bottomTrack = bottomRibbonTrackRef.current;
      if (!section || !topTrack || !bottomTrack) return;

      gsap.set(topTrack, { xPercent: topStart, force3D: true });
      gsap.set(bottomTrack, { xPercent: bottomStart, force3D: true });

      gsap.to(topTrack, {
        xPercent: topEnd,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(bottomTrack, {
        xPercent: bottomEnd,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub,
          invalidateOnRefresh: true,
        },
      });
    };

    // Mobile (< 640px): slightly tighter travel so the crossing ribbons feel balanced on narrow viewports
    mm.add('(max-width: 639px)', () => {
      createRibbons({
        topStart: -6,
        topEnd: -28,
        bottomStart: -28,
        bottomEnd: -6,
        scrub: 1.25,
      });
    });

    // Desktop (>= 640px): full opposite-direction crossing ribbon sweep
    mm.add('(min-width: 640px)', () => {
      createRibbons({
        topStart: -8,
        topEnd: -38,
        bottomStart: -36,
        bottomEnd: -6,
        scrub: 1.4,
      });
    });
  }, sectionRef);

  return () => ctx.revert();
}