import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Counter.module.scss';

const Counter = ({ onCountChange }) => {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    const newCount = Math.max(count - 1, 1);
    setCount(newCount);
    onCountChange(newCount);
  };

  return (
    <div className={styles.counter}>
      <button onClick={decrement}>-</button>
      <span>{Math.round(count)}</span>
      <button onClick={increment}>+</button>
    </div>
  );
};

Counter.propTypes = {
  onCountChange: PropTypes.func.isRequired
};

export default Counter;
