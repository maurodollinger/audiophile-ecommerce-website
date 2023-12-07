import React, {useRef} from 'react';
import { motion, useInView } from 'framer-motion';

// eslint-disable-next-line react/prop-types
const FadeInElement = ({ children }) => {


  const ref = useRef(null);
  const inView = useInView(ref,{ once: true, threshold: 0.2, });

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeInVariants}
    >
      {children}
    </motion.div>
  );
};

export default FadeInElement;