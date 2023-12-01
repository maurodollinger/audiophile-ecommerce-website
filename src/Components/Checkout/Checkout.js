import React, { useState, useContext, useEffect } from 'react';
import styles from './Checkout.module.scss';
import Card from '../UI/Card/Card';
import CartContext from '../../store/CartContext';
import OrderList from '../Shared/OrderList/OrderList';
import { CheckoutGuard } from './CheckoutGuard';
import cashOnIcon from '../../assets/checkout/icon-cash-on-delivery.svg';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useForm } from '../../store/FormContext';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone number is required').min(10, 'Phone number must have at least 10 digits'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().required('Address is required'),
  zipcode: Yup.string().min(5, 'Zip code must have at least 5 digits').required('Zip code is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  emoneynumber: Yup.string().required('E-money number is required'),
  emoneypin:Yup.string().required('E-money pint is required')
});

export const CustomInput = ({field,meta,placeholder}) =>{
  return(
    <>
      <input type="text" placeholder={placeholder} {...field} className={`${meta.error ? styles.invalid : ''}`}/>
      {meta.touched && meta.error && (
        <span className="error">{meta.error}</span>
      )}
    </>
  );
};

CustomInput.propTypes ={
  field:PropTypes.object,
  meta:PropTypes.object,
  placeholder:PropTypes.string
};

export const CheckoutFormContainer = () =>{
  const { setFormValid,  onSubmitForm, setOffSubmitHandler} = useForm();
  
  return(
    <Card className={styles.checkoutFormContainer}>
      <h3>Checkout</h3>    
      <Formik
        initialValues={{
          name: '',
          phone: '',
          email: '',
          address: '',
          zipcode: '',
          country: '',
          city: '',
          emoneynumber:'',
          emoneypin:''
        }}
        validationSchema={validationSchema}
        // eslint-disable-next-line no-unused-vars
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isValid , submitForm}) => {
          const enableFormSubmission = () => {
            if (onSubmitForm === true && isValid === true) {
              submitForm();
              setOffSubmitHandler();
            }
          };

          useEffect(() => {
            setFormValid(isValid);
          }, [isValid]);

          useEffect(() => {
            enableFormSubmission();
          }, [onSubmitForm, isValid]);
          return(
            <FormComponent/>
          );
        }}
      </Formik>      
     
    </Card>
  );
};

export const FormComponent = () =>{
  const [formData, setFormData] = useState({
    selectedOption: 'e-money',
  });

  const handleOptionChange = (event) => {
    setFormData({ ...formData, selectedOption: event.target.id });
  };

  return (
    <Form>
      <span className='subtitle orange'>Billing Details</span>
      <div className={styles.inputGroup}>
        <div className={styles.half}>
          <label htmlFor='name'>Name</label>
          <Field type='text' name='name'>
            {({
              field, 
              meta,
            }) => (
              <CustomInput field={field} meta={meta} placeholder='Alexei Ward'/>
            )}
          </Field>
          <label htmlFor='phone'>Phone Number</label>
          <Field type='telephone' name='phone'>
            {({
              field, 
              meta,
            }) => (
              <CustomInput field={field} meta={meta} placeholder='+1 202-555-0136'/>
            )}
          </Field>
        </div>
        <div className={styles.half}>
          <label htmlFor='email'>Email Address</label>
          <Field type='text' name='email'>
            {({
              field, 
              meta,
            }) => (
              <CustomInput field={field} meta={meta} placeholder='alexei@mail.com'/>
            )}
          </Field>
        </div>
      </div>    
      <span className='subtitle orange'>shipping info</span>
      <div className={styles.inputGroup}>
        <div className={styles.full}>
          <label htmlFor='address'>Adress</label>
          <Field type='text' name='address'>
            {({
              field, 
              meta,
            }) => (
              <CustomInput field={field} meta={meta} placeholder='1137 Williams Avenue'/>
            )}
          </Field>
        </div>              
      </div>  
      <div className={styles.inputGroup}>                
        <div className={styles.half}>
          <label htmlFor='zipcode'>ZIP Code</label>
          <Field type='number' name='zipcode'>
            {({
              field, 
              meta,
            }) => (
              <CustomInput field={field} meta={meta} placeholder='10001'/>
            )}
          </Field>
          <label htmlFor='country'>Country</label>
          <Field type='text' name='country'>
            {({
              field, 
              meta,
            }) => (
              <CustomInput field={field} meta={meta} placeholder='United States'/>
            )}
          </Field>
        </div>
        <div className={styles.half}>
          <label htmlFor='city'>City</label>
          <Field type='text' name='city'>
            {({
              field, 
              meta,
            }) => (
              <CustomInput field={field} meta={meta} placeholder='New York'/>
            )}
          </Field>
        </div>
      </div>    
      <span className='subtitle orange'>payment details</span>  
      <div className={styles.inputGroup}>                
        <div className={styles.half}>
          <label>Payment Method</label>
        </div>
        <div className={styles.half}>
          <div className={`${styles.inputOptions} ${formData.selectedOption === 'e-money' ? styles.selected : ''}`}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={formData.selectedOption === 'e-money' ? styles.selected : ''}>
                <circle cx="10" cy="10" r="9.5" stroke="#CFCFCF"/>
                <circle cx="10" cy="10" r="5" fill="#D87D4A"/>
              </svg>
            </div>
            <input type='radio' id="e-money" name="opciones" checked={formData.selectedOption === 'e-money'} onChange={handleOptionChange}></input>
            <label htmlFor="e-money">e-Money</label>
          </div>
          <div className={`${styles.inputOptions} ${formData.selectedOption === 'cash-on-delivery' ? styles.selected : ''}`}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={formData.selectedOption === 'cash-on-delivery' ? styles.selected : ''}>
                <circle cx="10" cy="10" r="9.5" stroke="#CFCFCF"/>
                <circle cx="10" cy="10" r="5" fill="#D87D4A"/>
              </svg>
            </div>
            <input type='radio' id="cash-on-delivery" name="opciones" checked={formData.selectedOption === 'cash-on-delivery'}  onChange={handleOptionChange}></input>
            <label htmlFor="cash-on-delivery">Cash on Delivery</label>
          </div>    
        </div>
      </div> 
      {
        (formData.selectedOption === 'e-money') ? 

          <div className={styles.inputGroup}>
            <div className={styles.half}>
              <label htmlFor='emoneynumber'>e-money Number</label>
              <Field type='text' name='emoneynumber'>
                {({
                  field, 
                  meta,
                }) => (
                  <CustomInput field={field} meta={meta} placeholder='238521993'/>
                )}
              </Field>
            </div>
            <div className={styles.half}>
              <label htmlFor='emoneypin'>e-money Pin</label>
              <Field type='text' name='emoneypin'>
                {({
                  field, 
                  meta,
                }) => (
                  <CustomInput field={field} meta={meta} placeholder='6891'/>
                )}
              </Field>
            </div>
          </div>
          :
          <div className={styles.cashOnInfo}>
            <div><img src={cashOnIcon}></img></div>
            <p>{'The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.'}</p>
          </div>
      }

    </Form>
  );
};


const Checkout = () =>{
  const cartCtx = useContext(CartContext);
  const { isFormValid, setOnSubmitHandler } = useForm();

  const handleSubmit = () =>{
    setOnSubmitHandler();
  };
  return(
    <section className={styles.checkout}>
      <div className='container'>
        <span onClick={()=>{}}>Go Back</span>
        <div>
          <CheckoutFormContainer/>
          <Card className={styles.summary}>
            <h6>Summary</h6>
            <OrderList items={cartCtx.items} isModal={false} disabledSubmit={!isFormValid} onSubmit={handleSubmit}/>
          </Card>
        </div>
        
      </div>

      <CheckoutGuard/>
    </section>
  );
};

export default Checkout;