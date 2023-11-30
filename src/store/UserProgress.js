import React, { useState } from 'react';
import { createContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const UserProgressContext = createContext({
  progress:'',
  showCart:()=>{},
  hideCart:()=>{},
  showCheckout:()=>{},
  hideCheckout:()=>{}
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

  function hideCheckout(){
    setUserProgress('');
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
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