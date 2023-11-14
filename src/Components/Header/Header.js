import React from 'react';
import styles from './Header.module.scss';

const Header = () =>{
  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.logo}></div>
        <div className={styles.btnMobile}></div>
        <ul className={styles.navDesktop}>
          <li>Home</li>
          <li>Headphones</li>
          <li>Speakers</li>
          <li>Earphones</li>
        </ul>
        <div className={styles.btnCart}></div>
      </nav>
    </header>
  );
};

export default Header;