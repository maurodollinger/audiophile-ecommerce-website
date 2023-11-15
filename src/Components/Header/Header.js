import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () =>{
  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.logo}></div>
        <div className={styles.btnMobile}></div>
        <ul className={styles.navDesktop}>
          <li><Link to=''>Home</Link></li>
          <li><Link to=''>Headphones</Link></li>
          <li><Link to=''>Speakers</Link></li>
          <li><Link to=''>Earphones</Link></li>
        </ul>
        <div className={styles.btnCart}></div>
      </nav>
    </header>
  );
};

export default Header;