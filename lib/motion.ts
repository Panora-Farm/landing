import type { Transition } from 'framer-motion';

/** Signature easing — used for every entrance, reveal, and hover. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp = (delay = 0, distance = 24) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE_OUT } satisfies Transition,
});

export const fadeUpInView = (inView: boolean, delay = 0, distance = 24) => ({
  initial: { opacity: 0, y: distance },
  animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance },
  transition: { duration: 0.6, delay, ease: EASE_OUT } satisfies Transition,
});
