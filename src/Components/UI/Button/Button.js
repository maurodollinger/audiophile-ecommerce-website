import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import {motion} from 'framer-motion';

const Button = (props) =>{
  let type;
  let backgroundColor;
  let backgroundColorHover;

  
  switch(props.type){
  default:
  case 'one':
    type = styles.one;
    backgroundColor = '#D87D4A';
    backgroundColorHover = '#FBAF85';
    break;
  case 'two':
    type = styles.two;
    backgroundColor = 'rgba(0,0,0,0)';
    backgroundColorHover = '#000';
    break;
  case 'three':
    type = styles.three;
    backgroundColor = '#000';
    backgroundColorHover = '#4C4C4C';
    break;
  }
  return (
    <motion.button 
      initial={{backgroundColor:backgroundColor}}
      whileHover={{backgroundColor:backgroundColorHover, transition:{type:'spring', duration:0.2}}}
      whileTap={{scale:0.96,transition:{duration:0.01}}}
      className={`${styles.button} ${type} ${props.disabled ? styles.disabled : ''}`} 
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.children}
    </motion.button>
  );
};

Button.propTypes ={
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;