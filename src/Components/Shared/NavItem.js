import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NavItem = ({ index, i }) => {
  return (
    <motion.li
      initial={{ color: '#FFFFFF' }}
      whileHover={{ scale: 1.1, color: '#D87D4A', transition: { duration: 0.2 } }}
      key={index}
    >
      <Link to={i.link} style={{ textDecoration: 'none', color: 'inherit' }}>
        {i.name}
      </Link>
    </motion.li>
  );
};

NavItem.propTypes = {
  index: PropTypes.number.isRequired,
  i: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default NavItem;
