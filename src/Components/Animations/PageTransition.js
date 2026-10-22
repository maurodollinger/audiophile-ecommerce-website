import React, { useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_IN_OUT, EASE_OUT } from './motion';
import { scrollToTop, useLenis } from './SmoothScroll';
import styles from './PageTransition.module.scss';

const curtain = (enterDelay, exitDelay) => ({
  initial: { scaleY: 1, originY: 0 },
  enter: { scaleY: 0, originY: 0, transition: { duration: 0.7, ease: EASE_IN_OUT, delay: enterDelay } },
  exit: { scaleY: 1, originY: 1, transition: { duration: 0.5, ease: EASE_IN_OUT, delay: exitDelay } },
});

const page = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.35 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.35, ease: EASE_OUT } },
};

// The outlet is frozen per key so the exiting page keeps rendering its own route.
const FrozenOutlet = () => {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
};

const PageTransition = () => {
  const location = useLocation();
  const lenis = useLenis();

  return (
    <AnimatePresence mode='wait' initial={false} onExitComplete={() => scrollToTop(lenis)}>
      <motion.main key={location.pathname} initial='initial' animate='enter' exit='exit'>
        <motion.div className={`${styles.curtain} ${styles.orange}`} variants={curtain(0.12, 0)} />
        <motion.div className={`${styles.curtain} ${styles.dark}`} variants={curtain(0, 0.08)} />
        <motion.div variants={page}>
          <FrozenOutlet />
        </motion.div>
      </motion.main>
    </AnimatePresence>
  );
};

export default PageTransition;
