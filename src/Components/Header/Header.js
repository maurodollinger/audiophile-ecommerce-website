import React, { useContext } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import UserProgressContext from '../../store/UserProgress';
import CartContext from '../../store/CartContext';

const Header = () =>{
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  const handleClick =() =>{
    if(cartCtx.totalItems>0){
      userProgressCtx.showCart();
    }   
  };

  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.logo}></div>
        <div className={styles.btnMobile}></div>
        <ul className={styles.navDesktop}>
          <li><Link to=''>Home</Link></li>
          <li><Link to='category/headphones'>Headphones</Link></li>
          <li><Link to='category/speakers'>Speakers</Link></li>
          <li><Link to='category/earphones'>Earphones</Link></li>
        </ul>
        <div className={styles.btnCart} onClick={handleClick}>
          
          {
            (cartCtx.totalItems > 0) && <small>{cartCtx.totalItems}</small>
          }
        </div>
      </nav>
    </header>
  );
};

export default Header;