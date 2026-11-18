import { motion } from 'framer-motion';

export function useGegsIntroAnimations() {
  // Container stagger configuration synchronized to start right after preloader completes (~1.8s)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 1.85, // Triggers right as PreloaderNavbar finishes its reveal sequence
      },
    },
  };

  // Background philosophy text: slides up into position smoothly
  const backgroundSlideUpVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Left philosophy text: slides in from the left
  const slideInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Right status badge: slides in from the right
  const slideInFromRight = {
    hidden: { opacity: 0, x: 50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Center toggle scale & fade
  const centerToggleVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return {
    containerVariants,
    backgroundSlideUpVariants,
    slideInFromLeft,
    slideInFromRight,
    centerToggleVariants,
  };
}