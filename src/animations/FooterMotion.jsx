import { gsap } from 'gsap';

export const ATELIER_EASE = [0.22, 1, 0.36, 1];

export const footerRevealMotion = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: ATELIER_EASE },
};

export const wovenTagVariants = {
  stitched: {
    rotate: -1.5,
    y: 0,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 380,
      damping: 22,
    },
  },
  detached: {
    rotate: 6.5,
    y: 26,
    x: 8,
    transition: {
      type: 'spring',
      stiffness: 460,
      damping: 16,
      mass: 0.9,
    },
  },
};

export const threadPullButtonMotion = {
  whileHover: { y: -2, boxShadow: '5px 5px 0px #2563EB' },
  whileTap: { x: 2, y: 2, boxShadow: '1px 1px 0px #141413' },
  transition: { type: 'spring', stiffness: 450, damping: 26 },
};

export const backToTopMotion = {
  whileHover: { y: -3, boxShadow: '6px 6px 0px #2563EB' },
  whileTap: { x: 2, y: 2, boxShadow: '2px 2px 0px #141413' },
  transition: { type: 'spring', stiffness: 450, damping: 28 },
};

export function animateTapeSlide(trackEl, offsetPx) {
  if (!trackEl) return;
  gsap.to(trackEl, {
    x: offsetPx,
    duration: 0.14,
    ease: 'power2.out',
    overwrite: 'auto',
    force3D: true,
  });
}