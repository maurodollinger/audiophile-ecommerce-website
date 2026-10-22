import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import { motion } from 'framer-motion';
import { DURATION, EASE_OUT, SPRING } from '../../Animations/motion';

const Button = (props) => {
  let type;
  let backgroundColor;
  let backgroundColorHover;
  let gradient;

  switch (props.type) {
  default:
  case 'one':
    type = styles.one;
    backgroundColor = '#D87D4A';
    backgroundColorHover = '#FBAF85';
    gradient = 'rgba(255, 255, 255, 0.3)';
    break;
  case 'two':
    type = styles.two;
    backgroundColor = 'rgba(0,0,0,0)';
    backgroundColorHover = '#000';
    gradient = 'rgba(0, 0, 0, 0.3)';
    break;
  case 'three':
    type = styles.three;
    backgroundColor = '#000';
    backgroundColorHover = '#4C4C4C';
    gradient = 'rgba(76, 76, 76, 0.1)';
    break;
  }

  return (
    <motion.button
      initial={{ backgroundColor }}
      whileHover={props.disabled ? undefined : { backgroundColor: backgroundColorHover, transition: { duration: DURATION.fast * 1.5, ease: EASE_OUT } }}
      whileTap={props.disabled ? undefined : { scale: 0.96, transition: SPRING }}
      className={`${styles.button} ${type} ${props.disabled ? styles.disabled : ''}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
      <svg viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" style={{ stopColor: 'transparent' }} />
          <stop offset="50%" style={{ stopColor: gradient }} />
        </linearGradient>
        <rect width="1" height="1" fill="url(#gradient)" />
      </svg>
    </motion.button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
