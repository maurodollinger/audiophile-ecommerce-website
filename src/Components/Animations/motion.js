export const EASE_OUT = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

export const DURATION = {
  fast: 0.2,
  base: 0.6,
  slow: 0.9,
};

export const SPRING = { type: 'spring', stiffness: 300, damping: 24 };

export const baseTransition = { duration: DURATION.base, ease: EASE_OUT };

// A variant-level delay overrides the parent's staggerChildren delay, so only set it when given.
const withDelay = (transition, delay) => (delay ? { ...transition, delay } : transition);

const makeVariant = (hidden, visible, transition = baseTransition) => ({
  hidden,
  visible: (delay) => ({ ...visible, transition: withDelay(transition, delay) }),
});

export const fadeUp = makeVariant({ opacity: 0, y: 32 }, { opacity: 1, y: 0 });
export const fadeIn = makeVariant({ opacity: 0 }, { opacity: 1 });
export const slideLeft = makeVariant({ opacity: 0, x: 60 }, { opacity: 1, x: 0 });
export const slideRight = makeVariant({ opacity: 0, x: -60 }, { opacity: 1, x: 0 });
export const scaleIn = makeVariant({ opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1 });

// Chrome's IntersectionObserver applies the target's own clip-path (ratio stays 0),
// so clipReveal must inherit its state from a parent that owns whileInView.
export const clipReveal = makeVariant(
  { clipPath: 'inset(0% 0% 100% 0%)' },
  { clipPath: 'inset(0% 0% 0% 0%)' },
  { duration: DURATION.slow, ease: EASE_IN_OUT },
);

export const maskUp = makeVariant(
  { y: '110%' },
  { y: '0%' },
  { duration: DURATION.slow, ease: EASE_OUT },
);

export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const variants = { fadeUp, fadeIn, slideLeft, slideRight, scaleIn, clipReveal, maskUp };

export const viewportOnce = { once: true, amount: 0.2 };
