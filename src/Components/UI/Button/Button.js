import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = (props) =>{
  let type;
  
  switch(props.type){
  default:
  case 'one':
    type = styles.one;
    break;
  case 'two':
    type = styles.two;
    break;
  case 'three':
    type = styles.three;
    break;
  }
  return (
    <button className={`${styles.button} ${type}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

Button.propTypes ={
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;