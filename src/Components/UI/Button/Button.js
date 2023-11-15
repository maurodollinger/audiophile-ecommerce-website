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
  }
  return (
    <button className={`${styles.button} ${type}`}>
      {props.children}
    </button>
  );
};

Button.propTypes ={
  children: PropTypes.node.isRequired,
  type: PropTypes.string
};

export default Button;