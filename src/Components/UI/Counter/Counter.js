import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Counter.module.scss';

const Counter = ({ onCountChange, initialCount = 1,  small = false }) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    const newCount = count +1;
    setCount(newCount);
    onCountChange(newCount);
  };

  const decrement = () => {
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
      <span>{Math.round(count)}</span>
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
