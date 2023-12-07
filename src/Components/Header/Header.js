/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import UserProgressContext from '../../store/UserProgress';
import CartContext from '../../store/CartContext';
import CategoryList from '../Shared/CategoryList/CategoryList';
import { motion} from 'framer-motion';
import NavItem from '../Shared/NavItem';


const items = [
  {name:'Home',link:''},
  {name:'Headphones',link:'category/headphones'},
  {name:'Speakers',link:'category/speakers'},
  {name:'Earphones',link:'category/earphones'},
];

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
        <motion.ul className={styles.navDesktop}>
          {
            items.map((i,index)=>(
              <NavItem key={index} index={index} i={i} />
            ))
          }
        </motion.ul>
        <motion.div 
          whileHover={{scale:1.2}}
          transition={{type: 'spring', duration:0.3}}
          className={styles.btnCart} 
          onClick={handleClick}>          
          {
            (cartCtx.totalItems > 0) && (
              <motion.small
                key={cartCtx.totalItems} 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ type: 'spring', duration: 0.3 }}
              >{cartCtx.totalItems}</motion.small>
            )
          }
        </motion.div>
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