import React, { useContext, useEffect, useRef } from 'react';
import Modal from '../UI/Modal/Modal';
import styles from './OrderComplete.module.scss';
import Button from '../UI/Button/Button';
import icon from '../../assets/checkout/icon-order-confirmation.svg';
import CartContext from '../../store/CartContext';
import { currencyFormatter } from '../../utils/formatting';
import UserProgressContext from '../../store/UserProgress';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../Animations/motion';

const checkPop = {
  hidden: { scale: 0, rotate: -90, opacity: 0 },
  visible: { scale: 1, rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 14 } },
};

const OrderComplete = () =>{
  const {items, grandTotal} = useContext(CartContext);
  const {progress,finishUserProgress} = useContext(UserProgressContext);
  const image = useRef();

  const handleClose = () =>{
    finishUserProgress();
  };

  useEffect(()=>{
    if (items.length > 0 && progress==='completed') {
      const firstItemImage = new Image();
      firstItemImage.src = items[0].image.mobile;
      image.current.src = firstItemImage.src;
    }
  },[items,progress]);
  
  return(
    items.length >0  && (
      <Modal className={styles.orderComplete} open={progress==='completed'} handleClose={handleClose}>
        <motion.div variants={staggerContainer(0.08, 0.15)}>
          <motion.img src={icon} variants={checkPop} alt=''></motion.img>
          <motion.h3 variants={fadeUp}>THANK YOU FOR YOUR ORDER</motion.h3>
          <motion.p variants={fadeUp}>You will receive an email confirmation shortly.</motion.p>
          <motion.div className={styles.orderInfo} variants={fadeUp}>
            <div>
              <div>
                <img ref={image} src={(items[0].image.mobile)} alt={items[0].name}></img>
                <div>
                  <p>{items[0].name}</p>
                  <p>{currencyFormatter.format(items[0].price)}</p>
                </div>
                <div>
                  <p>{'x'+items[0].quantity}</p>
                </div>
              </div>  
              {(items.length>1) && (            
                <div className={styles.more}>
                  <p>{`and ${items.length-1} other item(s)`}</p>
                </div>)}
            </div>
            <div>
              <p>GRAND TOTAL</p>
              <p>{currencyFormatter.format(grandTotal)}</p>
            </div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Button type='one' onClick={handleClose}>BACK TO HOME</Button>
          </motion.div>
        </motion.div>
      </Modal>
    )
  );
};

export default OrderComplete;