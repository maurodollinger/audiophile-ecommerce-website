import React, { useContext, useEffect, useRef } from 'react';
import Modal from '../UI/Modal/Modal';
import styles from './OrderComplete.module.scss';
import Button from '../UI/Button/Button';
import icon from '../../assets/checkout/icon-order-confirmation.svg';
import CartContext from '../../store/CartContext';
import { currencyFormatter } from '../../utils/formatting';
import UserProgressContext from '../../store/UserProgress';

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
      console.log(image.current.src);
    }
  },[items,progress]);
  
  return(
    items.length && (
      <Modal className={styles.orderComplete} open={progress==='completed'} handleClose={handleClose}>
        <div>
          <img src={icon}></img>
          <h3>THANK YOU FOR YOUR ORDER</h3>
          <p>You will receive an email confirmation shortly.</p>
          <div className={styles.orderInfo}>
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
          </div>
          <Button type='one' onClick={handleClose}>BACK TO HOME</Button>
        </div>
      </Modal>
    )
  );
};

export default OrderComplete;