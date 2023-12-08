import React from 'react';
import { motion } from 'framer-motion';

// eslint-disable-next-line react/prop-types
const ZoomInElement = ({ children, className, style }) => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05, transition: { type: 'spring' } }}
      className={className}
      style={{ ...style, transformOrigin: 'center center' }}
    >
      {children}
    </motion.div>
  );
};

export default ZoomInElement;
