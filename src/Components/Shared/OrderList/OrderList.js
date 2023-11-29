import React from 'react';
import { currencyFormatter } from '../../../utils/formatting';
import Counter from '../../UI/Counter/Counter';
import styles from './OrderList.module.scss';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';

const OrderList = ({items, isModal = true}) =>{

  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const path = '../';
  return(
    <>
      <ul className={`${styles.orderList} ${isModal ? styles.fixed : ''}`}>
        {
          items.map((item, index)=>(
            <li key={index}>
              <div className={styles.image}><img src={path+item.image.mobile}></img></div>
              <div className={styles.info}>
                <p><b>{item.name}</b></p> 
                <p>{currencyFormatter.format(item.price)}</p>
              </div>
              <div>
                <Counter onCountChange={()=>{}} initialCount={item.quantity} small></Counter>
              </div>
            </li>
          ))
        }
      </ul>

      <div className={styles.payload}>
        <div>
          <p>TOTAL</p>
          <p>{currencyFormatter.format(totalAmount)}</p>
        </div>
        <Button type='one'>Checkout</Button>
      </div>
    </>
  );
};

OrderList.propTypes ={
  items:PropTypes.array.isRequired,
  isModal:PropTypes.bool
};

export default OrderList;