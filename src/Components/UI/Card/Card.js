import React from 'react';
import styles from './Card.module.scss';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Card = ({children,className,...motionProps}) =>{
  return (
    <motion.div className={`${styles.card} ${className}`} {...motionProps}>{children}</motion.div>
  );
};

Card.propTypes ={
  children:PropTypes.node.isRequired,
  className:PropTypes.string
};

export default Card;
