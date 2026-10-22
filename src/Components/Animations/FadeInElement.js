import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { variants, staggerContainer, viewportOnce } from './motion';

export const Reveal = ({ children, variant = 'fadeUp', delay, as = 'div', stagger, className, style, amount }) => {
  const Component = motion[as];
  const variantSet = stagger ? staggerContainer(stagger, delay) : variants[variant];

  return (
    <Component
      className={className}
      style={style}
      initial='hidden'
      whileInView='visible'
      viewport={amount ? { ...viewportOnce, amount } : viewportOnce}
      variants={variantSet}
      custom={delay}
    >
      {children}
    </Component>
  );
};

Reveal.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.keys(variants)),
  delay: PropTypes.number,
  as: PropTypes.string,
  stagger: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  amount: PropTypes.number,
};

export const RevealItem = ({ children, variant = 'fadeUp', as = 'div', className, style }) => {
  const Component = motion[as];
  return (
    <Component className={className} style={style} variants={variants[variant]}>
      {children}
    </Component>
  );
};

RevealItem.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.keys(variants)),
  as: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

const FadeInElement = (props) => <Reveal {...props} />;

export default FadeInElement;
