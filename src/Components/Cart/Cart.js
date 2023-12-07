import React, { useContext, useEffect } from 'react';
import Modal from '../UI/Modal/Modal';
import UserProgressContext from '../../store/UserProgress';
import styles from './Cart.module.scss';
import CartContext from '../../store/CartContext';
import OrderList from '../Shared/OrderList/OrderList';

const Cart = () =>{
  const { hideCart, showCheckout, progress } = useContext(UserProgressContext);
  const { removeAll, removeItem, addItem, items, totalItems } = useContext(CartContext);

  const handleClose =()=>{
    hideCart();
  };

  const handleCountChange = (count,item)=>{    
    if (count === 0) {
      removeItem(item.id);
    } else if (count > item.quantity) {
      addItem({ ...item, quantity: 1 });
    } else {
      removeItem(item.id);
    }
  };

  const handleOnEmptyList = ()=>{
    hideCart();
  };

  const handleCheckout = () =>{
    showCheckout();
  };

  useEffect(()=>{
    if(totalItems===0) hideCart();
  },[totalItems]);

  return(
    <Modal className={styles.cartModal} open={progress==='cart'} handleClose={handleClose}>
      <div>
        {
          <div>
            <h6>Cart({totalItems})</h6>
            <p onClick={() => removeAll()}>Remove all</p>
          </div>
        }
        {
          <>
            <OrderList items={items} isModal onCountChange={handleCountChange} onEmptyList={handleOnEmptyList} goToCheckout={handleCheckout}/>
          </>
        }
      </div>
    </Modal>
  );
};

export default Cart;