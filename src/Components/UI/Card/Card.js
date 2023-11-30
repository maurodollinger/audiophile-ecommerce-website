import React from 'react';
import styles from './Card.module.scss';
import PropTypes from 'prop-types';

const Card = ({children,className}) =>{
  return (
    <div className={`${styles.card} ${className}`}>{children}</div>
  );
};

Card.propTypes ={
  children:PropTypes.node.isRequired,
  className:PropTypes.string
};

export default Card;