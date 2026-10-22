import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Counter.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { SPRING } from '../../Animations/motion';

const roll = {
  enter: (dir) => ({ y: dir > 0 ? 14 : -14, opacity: 0 }),
  center: { y: 0, opacity: 1, transition: SPRING },
  exit: (dir) => ({ y: dir > 0 ? -14 : 14, opacity: 0, transition: { duration: 0.15 } }),
};

const Counter = ({ onCountChange, initialCount = 1,  small = false }) => {
  const [count, setCount] = useState(initialCount);
  const direction = useRef(1);

  const increment = () => {
    const newCount = count +1;
    direction.current = 1;
    setCount(newCount);
    onCountChange(newCount);
  };

  const decrement = () => {
    if(small && count === 1){
      onCountChange(0);
      return;
    }
    const newCount = Math.max(count - 1, 1);
    direction.current = -1;
    setCount(newCount);
    onCountChange(newCount);    
  };

  useEffect(()=>{
    setCount(initialCount);
  },[initialCount]);

  return (
    <div className={`${styles.counter} ${small ? styles.small : ''}`}>
      <motion.button whileTap={{ scale: 0.8 }} onClick={decrement}>-</motion.button>
      <span className={styles.value}>
        <AnimatePresence initial={false} mode='popLayout' custom={direction.current}>
          <motion.span
            key={count}
            custom={direction.current}
            variants={roll}
            initial='enter'
            animate='center'
            exit='exit'>
            {Math.round(count)}
          </motion.span>
        </AnimatePresence>
      </span>
      <motion.button whileTap={{ scale: 0.8 }} onClick={increment}>+</motion.button>
    </div>
  );
};

Counter.propTypes = {
  onCountChange: PropTypes.func.isRequired,
  initialCount: PropTypes.number,
  small:PropTypes.bool
};

export default Counter;
