import React from 'react';
import styles from './ShopButton.module.scss';
import PropTypes from 'prop-types';

const ShopButton =({onClick}) =>{
  return(
    <button className={styles.shopButton} onClick={onClick}>
      <span className={'btnCatProduct_shop'}>shop</span>
      <span><svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
        <path d="M1.3219 1L6.3219 6L1.3219 11" stroke="#D87D4A" strokeWidth="2"/>
      </svg></span>
    </button>
  );
};

ShopButton.propTypes = {
  onClick:PropTypes.func
};

export default ShopButton;