import React, { useContext } from 'react';
import Modal from '../UI/Modal/Modal';
import UserProgressContext from '../../store/UserProgress';
import styles from './Cart.module.scss';
import CartContext from '../../store/CartContext';
import OrderList from '../Shared/OrderList/OrderList';

const Cart = () =>{
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  const handleClose =()=>{
    userProgressCtx.hideCart();
  };

  return(
    <Modal className={styles.cartModal} open={userProgressCtx.progress==='cart'} handleClose={handleClose}>
      <div>
        {
          <div>
            <h6>Cart({cartCtx.totalItems})</h6>
            <p>Remove all</p>
          </div>
        }
        {
          <>
            <OrderList items={cartCtx.items} isModal/>
          </>
        }
      </div>
    </Modal>
  );
};

export default Cart;