import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { maskUp, staggerContainer, viewportOnce } from './motion';
import styles from './MaskText.module.scss';

const MaskText = ({ text, as = 'h1', className, delay = 0, stagger = 0.06, inView = true }) => {
  const Component = motion[as];
  const trigger = inView
    ? { whileInView: 'visible', viewport: viewportOnce }
    : { animate: 'visible' };

  return (
    <Component
      className={className}
      aria-label={text}
      initial='hidden'
      variants={staggerContainer(stagger, delay)}
      {...trigger}
    >
      {text.split(' ').map((word, i, words) => (
        <React.Fragment key={i}>
          <span className={styles.word} aria-hidden='true'>
            <motion.span className={styles.inner} variants={maskUp}>{word}</motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </Component>
  );
};

MaskText.propTypes = {
  text: PropTypes.string.isRequired,
  as: PropTypes.string,
  className: PropTypes.string,
  delay: PropTypes.number,
  stagger: PropTypes.number,
  inView: PropTypes.bool,
};

export default MaskText;
