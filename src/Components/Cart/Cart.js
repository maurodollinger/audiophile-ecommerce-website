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

  const handleRemoveAll = ()=>{
    cartCtx.removeAll();
  };

  const handleCountChange = (count,item)=>{    
    if(count===0) {
      cartCtx.removeItem(item.id);
    }else{
      if(count>item.quantity) cartCtx.addItem({...item,quantity:1});
      else cartCtx.removeItem(item.id);
    }
  };

  const handleOnEmptyList = ()=>{
    userProgressCtx.hideCart();
  };

  const handleGoToCheckout = () =>{
    userProgressCtx.showCheckout();
  };

  return(
    <Modal className={styles.cartModal} open={userProgressCtx.progress==='cart'} handleClose={handleClose}>
      <div>
        {
          <div>
            <h6>Cart({cartCtx.totalItems})</h6>
            <p onClick={handleRemoveAll}>Remove all</p>
          </div>
        }
        {
          <>
            <OrderList items={cartCtx.items} isModal onCountChange={handleCountChange} onEmptyList={handleOnEmptyList} goToCheckout={handleGoToCheckout}/>
          </>
        }
      </div>
    </Modal>
  );
};

export default Cart;