import React, { useContext, useState } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import UserProgressContext from '../../store/UserProgress';
import CartContext from '../../store/CartContext';
import CategoryList from '../Shared/CategoryList/CategoryList';

const Header = () =>{
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  const handleClick =() =>{
    if(cartCtx.totalItems>0){
      userProgressCtx.showCart();
    }   
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <header className={styles.header}>
      <nav>
        <Link className={styles.logo} to=''></Link>
        <div className={styles.btnMobile} onClick={handleMobileMenuToggle}></div>
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
        {isMobileMenuOpen && (
          <div className={styles.mobileCategoryDrop}>
            <div className='backdrop' ></div>
            <CategoryList/>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;