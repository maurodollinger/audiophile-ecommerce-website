import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence} from 'framer-motion';
import { useLenis } from '../../Animations/SmoothScroll';
import { DURATION, EASE_OUT } from '../../Animations/motion';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.4, transition: { duration: DURATION.base / 2 } },
  exit: { opacity: 0, transition: { duration: DURATION.fast, delay: 0.05 } },
};

const panel = {
  hidden: { opacity: 0, scale: 0.96, y: -16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: DURATION.base * 0.75, ease: EASE_OUT } },
  exit: { opacity: 0, scale: 0.97, y: -8, transition: { duration: DURATION.fast } },
};

const Modal = ({children, className, open, handleClose}) => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || !open) return;
    lenis.stop();
    return () => lenis.start();
  }, [open, lenis]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key='backdrop'
          className='backdrop open'
          onClick={handleClose}
          variants={backdrop}
          initial='hidden'
          animate='visible'
          exit='exit'
        />
      )}
      {open && (
        <motion.div
          key='modal'
          className={`modal ${className} open`}
          data-lenis-prevent
          variants={panel}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('modal')
  );
};

Modal.propTypes ={
  children:PropTypes.node.isRequired,
  className:PropTypes.string,
  open:PropTypes.bool,
  handleClose:PropTypes.func,
};

export default Modal;
