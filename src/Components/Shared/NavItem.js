import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SPRING } from '../Animations/motion';

const NavItem = ({ i, active, showUnderline, onHover }) => {
  return (
    <motion.li
      initial={false}
      animate={{ color: active ? '#D87D4A' : '#FFFFFF' }}
      whileHover={{ color: '#D87D4A', transition: { duration: 0.2 } }}
      onMouseEnter={onHover}
      style={{ position: 'relative' }}
    >
      <Link to={i.link} style={{ textDecoration: 'none', color: 'inherit' }}>
        {i.name}
      </Link>
      {showUnderline && (
        <motion.span
          layoutId='navUnderline'
          transition={SPRING}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -6,
            height: 2,
            borderRadius: 2,
            background: '#D87D4A',
          }}
        />
      )}
    </motion.li>
  );
};

NavItem.propTypes = {
  index: PropTypes.number.isRequired,
  i: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
  active: PropTypes.bool,
  showUnderline: PropTypes.bool,
  onHover: PropTypes.func,
};

export default NavItem;
