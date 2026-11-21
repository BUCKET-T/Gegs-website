import { gsap } from 'gsap';

export const ATELIER_EASE = [0.22, 1, 0.36, 1];

export const bespokeVideoStageMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.45, ease: ATELIER_EASE },
};

export const tiltedReelWallMotion = {
  initial: { opacity: 0, rotate: -6, scale: 1.08 },
  animate: { opacity: 1, rotate: -4, scale: 1.03 },
  exit: { opacity: 0, rotate: -6, scale: 1.08 },
  transition: { duration: 0.6, ease: ATELIER_EASE },
};

export function animateIntroStageParallax(stageEl, normalizedX, normalizedY) {
  if (!stageEl) return;

  gsap.to(stageEl, {
    x: normalizedX * 26,
    y: normalizedY * 16,
    duration: 0.55,
    ease: 'power2.out',
    overwrite: 'auto',
    force3D: true,
  });
}

export function resetIntroStageParallax(stageEl) {
  if (!stageEl) return;

  gsap.to(stageEl, {
    x: 0,
    y: 0,
    duration: 0.45,
    ease: 'power2.out',
    overwrite: 'auto',
    force3D: true,
  });
}