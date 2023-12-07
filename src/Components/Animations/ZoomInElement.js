import React from 'react';
import { motion } from 'framer-motion';

// eslint-disable-next-line react/prop-types
const ZoomInElement = ({ children, className, style}) => {
  return (
    <motion.div
      initial={{backgroundSize:'100%'}}
      whileHover={{backgroundSize:'105%', transition:{type:'spring'}}}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default ZoomInElement;