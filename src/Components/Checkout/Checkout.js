import React, { useState, useContext } from 'react';
import styles from './Checkout.module.scss';
import Card from '../UI/Card/Card';
import CartContext from '../../store/CartContext';
import OrderList from '../Shared/OrderList/OrderList';
import { CheckoutGuard } from './CheckoutGuard';
import cashOnIcon from '../../assets/checkout/icon-cash-on-delivery.svg';
//import PropTypes from 'prop-types';


export const CheckoutFormContainer = () =>{
  const [selectedOption, setSelectedOption] = useState('e-money');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.id);
  };
  return(
    <Card className={styles.checkoutFormContainer}>
      <h3>Checkout</h3>          
      <form>
        <span className='subtitle orange'>Billing Details</span>
        <div className={styles.inputGroup}>
          <div className={styles.half}>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' placeholder='Alexei Ward'></input>
            <label htmlFor='phone'>Phone Number</label>
            <input type='telephone' name='phone' placeholder='+1 202-555-0136'></input>
          </div>
          <div className={styles.half}>
            <label htmlFor='email'>Email Address</label>
            <input type='text' name='email' placeholder='alexei@mail.com'></input>
          </div>
        </div>    
        <span className='subtitle orange'>shipping info</span>
        <div className={styles.inputGroup}>
          <div className={styles.full}>
            <label htmlFor='address'>Adress</label>
            <input type='text' name='address' placeholder='1137 Williams Avenue'></input>
          </div>              
        </div>  
        <div className={styles.inputGroup}>                
          <div className={styles.half}>
            <label htmlFor='zipcode'>ZIP Code</label>
            <input type='number' name='zipcode' placeholder='10001'></input>
            <label htmlFor='country'>Country</label>
            <input type='text' name='country' placeholder='United States'></input>
          </div>
          <div className={styles.half}>
            <label htmlFor='city'>City</label>
            <input type='text' name='city' placeholder='New York'></input>
          </div>
        </div>    
        <span className='subtitle orange'>payment details</span>  
        <div className={styles.inputGroup}>                
          <div className={styles.half}>
            <label>Payment Method</label>
          </div>
          <div className={styles.half}>
            <div className={`${styles.inputOptions} ${selectedOption === 'e-money' ? styles.selected : ''}`}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={selectedOption === 'e-money' ? styles.selected : ''}>
                  <circle cx="10" cy="10" r="9.5" stroke="#CFCFCF"/>
                  <circle cx="10" cy="10" r="5" fill="#D87D4A"/>
                </svg>
              </span>
              <input type='radio' id="e-money" name="opciones" checked={selectedOption === 'e-money'} onChange={handleOptionChange}></input>
              <label htmlFor="e-money">e-Money</label>
            </div>
            <div className={`${styles.inputOptions} ${selectedOption === 'cash-on-delivery' ? styles.selected : ''}`}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={selectedOption === 'cash-on-delivery' ? styles.selected : ''}>
                  <circle cx="10" cy="10" r="9.5" stroke="#CFCFCF"/>
                  <circle cx="10" cy="10" r="5" fill="#D87D4A"/>
                </svg>
              </span>
              <input type='radio' id="cash-on-delivery" name="opciones" checked={selectedOption === 'cash-on-delivery'}  onChange={handleOptionChange}></input>
              <label htmlFor="cash-on-delivery">Cash on Delivery</label>
            </div>    
          </div>
        </div> 
        {
          (selectedOption === 'e-money') ? 

            <div className={styles.inputGroup}>
              <div className={styles.half}>
                <label htmlFor='e-money-number'>e-money Number</label>
                <input type='text' name='e-money-number' placeholder='238521993'></input>
              </div>
              <div className={styles.half}>
                <label htmlFor='e-money-pin'>e-money Pin</label>
                <input type='text' name='e-money-pin' placeholder='6891'></input>
              </div>
            </div>
            :
            <div className={styles.cashOnInfo}>
              <div><img src={cashOnIcon}></img></div>
              <p>{'The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.'}</p>
            </div>
        }
        
      </form>
    </Card>
  );
};

export const Summary = () =>{
  const cartCtx = useContext(CartContext);
  return(
    <Card className={styles.summary}>
      <h6>Summary</h6>
      <OrderList items={cartCtx.items} isModal={false} />
    </Card>
  );
};

const Checkout = () =>{
  return(
    <section className={styles.checkout}>
      <div className='container'>
        <span onClick={()=>{}}>Go Back</span>
        <div>
          <CheckoutFormContainer/>
          <Summary/>
        </div>
        
      </div>

      <CheckoutGuard/>
    </section>
  );
};

export default Checkout;