/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import UserProgressContext from '../../store/UserProgress';
import CartContext from '../../store/CartContext';
import CategoryList from '../Shared/CategoryList/CategoryList';
import { AnimatePresence, motion, useAnimationControls, useMotionValueEvent, useScroll } from 'framer-motion';
import NavItem from '../Shared/NavItem';
import { DURATION, EASE_OUT, SPRING } from '../Animations/motion';


const items = [
  {name:'Home',link:''},
  {name:'Headphones',link:'category/headphones'},
  {name:'Speakers',link:'category/speakers'},
  {name:'Earphones',link:'category/earphones'},
];

const getActiveIndex = (pathname) => {
  if (pathname === '/') return 0;
  return items.findIndex((i, index) => index > 0 && pathname.startsWith('/' + i.link));
};

const Header = () =>{
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHidden, setHidden] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);
  const location = useLocation();
  const cartControls = useAnimationControls();
  const { scrollY } = useScroll();

  const activeIndex = getActiveIndex(location.pathname);
  const underlineIndex = hovered ?? activeIndex;

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 50);
    setHidden(latest > previous && latest > 150);
  });

  useEffect(() => {
    if (cartCtx.totalItems > 0) {
      cartControls.start({ rotate: [0, -14, 10, -6, 0], transition: { duration: 0.5 } });
    }
  }, [cartCtx.totalItems]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleClick =() =>{
    if(cartCtx.totalItems>0){
      userProgressCtx.showCart();
    }   
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <motion.header
      className={`${styles.header} ${isScrolled || isMobileMenuOpen ? styles.scrolled : ''}`}
      animate={{ y: isHidden && !isMobileMenuOpen ? '-100%' : 0 }}
      transition={{ duration: DURATION.base / 1.5, ease: EASE_OUT }}
    >
      <nav>
        <Link className={styles.logo} to=''></Link>
        <motion.div
          className={styles.btnMobile}
          whileTap={{ scale: 0.85 }}
          onClick={handleMobileMenuToggle}
        ></motion.div>
        <ul className={styles.navDesktop} onMouseLeave={() => setHovered(null)}>
          {
            items.map((i,index)=>(
              <NavItem
                key={index}
                index={index}
                i={i}
                active={index === activeIndex}
                showUnderline={index === underlineIndex}
                onHover={() => setHovered(index)}
              />
            ))
          }
        </ul>
        <motion.div 
          whileHover={{scale:1.15}}
          transition={SPRING}
          className={styles.btnCart} 
          onClick={handleClick}>
          <motion.span className={styles.cartIcon} animate={cartControls} />
          <AnimatePresence>
            {
              (cartCtx.totalItems > 0) && (
                <motion.small
                  key={cartCtx.totalItems} 
                  initial={{ scale: 0.3, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  exit={{ scale: 0.3, opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                >{cartCtx.totalItems}</motion.small>
              )
            }
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key='mobileBackdrop'
              className={`backdrop open ${styles.mobileBackdrop}`}
              onClick={handleMobileMenuToggle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
            />
          )}
          {isMobileMenuOpen && (
            <motion.div
              key='mobileMenu'
              className={styles.mobileCategoryDrop}
              initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: DURATION.fast * 1.5 } }}
              transition={{ duration: DURATION.base, ease: EASE_OUT }}
            >
              <CategoryList callbackCloseMenu={handleMobileMenuToggle}/>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
