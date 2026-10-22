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
import UserProgressContext from '../../store/UserProgress';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal } from '../Animations/FadeInElement';
import { baseTransition, DURATION, EASE_OUT, fadeUp } from '../Animations/motion';

const cardVariants = {
  hidden: fadeUp.hidden,
  visible: { ...fadeUp.visible(), transition: { ...baseTransition, staggerChildren: 0.06, delayChildren: 0.15 } },
};

const swap = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: baseTransition },
  exit: { opacity: 0, y: -12, transition: { duration: DURATION.fast, ease: EASE_OUT } },
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone number is required').min(10, 'Phone number must have at least 10 digits'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().required('Address is required'),
  zipcode: Yup.string().min(5, 'Zip code must have at least 5 digits').required('Zip code is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  paymentMethod: Yup.string(),
  emoneynumber: Yup.string().when('paymentMethod', {
    is: 'e-money',
    then: (validationSchema) => validationSchema.required('E-money number is required'),
    otherwise: (validationSchema) => validationSchema.notRequired()
  }),
  emoneypin: Yup.string().when('paymentMethod', {
    is: 'e-money',
    then: (validationSchema) => validationSchema.required('E-money pin is required'),
    otherwise: (validationSchema) =>  validationSchema.notRequired()
  })
});
  

export const CustomInput = ({field,meta,placeholder}) =>{
  return(
    <>
      <input type="text" placeholder={placeholder} {...field} className={`${meta.error ? styles.invalid : ''}`}/>
      <AnimatePresence>
        {meta.touched && meta.error && (
          <motion.span
            className="error"
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE_OUT }}
            style={{ display: 'block' }}
          >{meta.error}</motion.span>
        )}
      </AnimatePresence>
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
  const {showCompleted} = useContext(UserProgressContext);
  
  return(
    <Card className={styles.checkoutFormContainer} variants={cardVariants}>
      <motion.h3 variants={fadeUp}>Checkout</motion.h3>    
      <Formik
        initialValues={{
          name: '',
          phone: '',
          email: '',
          address: '',
          zipcode: '',
          country: '',
          city: '',
          paymentMethod:'e-money',
          emoneynumber:'',
          emoneypin:'',
        }}
        validationSchema={validationSchema}
        // eslint-disable-next-line no-unused-vars
        onSubmit={(values) => {
          showCompleted();
        }}
      >
        {({ isValid , submitForm, setFieldValue}) => {
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
            <FormComponent setFieldValue={setFieldValue}/>
          );
        }}
      </Formik>      
     
    </Card>
  );
};

// eslint-disable-next-line react/prop-types
export const FormComponent = ({setFieldValue}) =>{
  const [formData, setFormData] = useState({
    selectedOption: 'e-money',
  });

  const handleOptionChange = (event) => {
    setFormData({ ...formData, selectedOption: event.target.id });
    setFieldValue('paymentMethod', event.target.id);
  };

  return (
    <Form>
      <motion.span className='subtitle orange' variants={fadeUp}>Billing Details</motion.span>
      <motion.div className={styles.inputGroup} variants={fadeUp}>
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
      </motion.div>    
      <motion.span className='subtitle orange' variants={fadeUp}>shipping info</motion.span>
      <motion.div className={styles.inputGroup} variants={fadeUp}>
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
      </motion.div>  
      <motion.div className={styles.inputGroup} variants={fadeUp}>                
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
      </motion.div>    
      <motion.span className='subtitle orange' variants={fadeUp}>payment details</motion.span>  
      <motion.div className={styles.inputGroup} variants={fadeUp}>                
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
            <input type='radio' id="e-money" name="opciones" checked={formData.selectedOption === 'e-money'} onChange={handleOptionChange} ></input>
            <Field type="hidden" name="paymentMethod" value={formData.selectedOption.toString()} />
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
      </motion.div> 
      <AnimatePresence mode='wait' initial={false}>
        {
          (formData.selectedOption === 'e-money') ? 

            <motion.div key='e-money' className={styles.inputGroup} {...swap}>
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
            </motion.div>
            :
            <motion.div key='cash' className={styles.cashOnInfo} {...swap}>
              <div><img src={cashOnIcon} alt='cash on delivery icon'></img></div>
              <p>{'The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.'}</p>
            </motion.div>
        }
      </AnimatePresence>

    </Form>
  );
};


const Checkout = () =>{
  const cartCtx = useContext(CartContext);
  const { isFormValid, setOnSubmitHandler } = useForm();
  const navigate = useNavigate();

  const handleSubmit = (value) =>{
    cartCtx.setGrandTotal(value);
    setOnSubmitHandler();
  };
  return(
    <section className={styles.checkout}>
      <div className='container'>
        <span className={styles.goBack} onClick={()=>navigate(-1)}>
          <span className={styles.arrow}>&larr;</span>Go Back
        </span>
        <Reveal stagger={0.15} amount={0.05}>
          <CheckoutFormContainer/>
          <Card className={styles.summary} variants={fadeUp}>
            <h6>Summary</h6>
            <OrderList items={cartCtx.items} isModal={false} disabledSubmit={!isFormValid} onSubmit={handleSubmit}/>
          </Card>
        </Reveal>
        
      </div>

      <CheckoutGuard/>
    </section>
  );
};

export default Checkout;