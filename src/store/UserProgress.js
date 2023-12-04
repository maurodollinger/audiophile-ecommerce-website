import React, { useState } from 'react';
import { createContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const UserProgressContext = createContext({
  progress:'',
  showCart:()=>{},
  hideCart:()=>{},
  showCheckout:()=>{},
  readyToPay:()=>{},
  showCompleted:()=>{},
  finishUserProgress:()=>{},
  cleanUserProgress:()=>{}
});

export function UserProgressContextProvider({children}){
  const [userProgress, setUserProgress] = useState('');
  const navigate = useNavigate();
    
  function showCart(){
    setUserProgress('cart');
  }

  function hideCart(){
    setUserProgress('');
  }

  function showCheckout(){
    setUserProgress('checkout');
    navigate('checkout');
  }

  function readyToPay(){
    setUserProgress('readytopay');
  }

  function showCompleted(){
    setUserProgress('completed');
  }

  function finishUserProgress(){
    setUserProgress('finished');
  }

  function cleanUserProgress(){
    setUserProgress('');
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    readyToPay,
    showCompleted,
    finishUserProgress,
    cleanUserProgress
  };

  return(
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

UserProgressContextProvider.propTypes ={
  children:PropTypes.node.isRequired
};

export default UserProgressContext;