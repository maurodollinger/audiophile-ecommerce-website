import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

export const scrollToTop = (lenis) => {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true });
  } else {
    window.scrollTo(0, 0);
  }
};

const SmoothScroll = ({ children }) => {
  const [lenis, setLenis] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    let frame;
    const raf = (time) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    setLenis(instance);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, [reduceMotion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
};

SmoothScroll.propTypes = {
  children: PropTypes.node,
};

export default SmoothScroll;
