import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Counter.module.scss';
import {motion} from 'framer-motion';

const Counter = ({ onCountChange, initialCount = 1,  small = false }) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    const newCount = count +1;
    setCount(newCount);
    onCountChange(newCount);
  };

  const decrement = () => {
    if(small && count === 1){
      onCountChange(0);
      return;
    }
    const newCount = Math.max(count - 1, 1);
    setCount(newCount);
    onCountChange(newCount);    
  };

  useEffect(()=>{
    setCount(initialCount);
  },[initialCount]);

  return (
    <div className={`${styles.counter} ${small ? styles.small : ''}`}>
      <button onClick={decrement}>-</button>
      <motion.span 
        key={count}
        initial={{opacity:0,y:10}}
        animate={{opacity:1,y:0}}>
        {Math.round(count)}
      </motion.span>
      <button onClick={increment}>+</button>
    </div>
  );
};

Counter.propTypes = {
  onCountChange: PropTypes.func.isRequired,
  initialCount: PropTypes.number,
  small:PropTypes.bool
};

export default Counter;
