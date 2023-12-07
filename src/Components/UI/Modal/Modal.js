import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence} from 'framer-motion';

const Modal = ({children, className, open, handleClose}) => {
  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className={`backdrop ${open ? 'open' : ''}`} onClick={handleClose}></div>
      {open && (
        <motion.div
          className={`modal ${className} open`}
          key={open}
          initial={{ opacity: 0 }}
          animate={{ opacity:1, transition:{duration:0.2}}}
          exit={{ opacity: 0 }}>
      
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('modal')
  );
};

Modal.propTypes ={
  children:PropTypes.node.isRequired
};

export default Modal;