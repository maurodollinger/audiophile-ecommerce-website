import React, { useEffect, useReducer } from 'react';
import { createContext } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext({
  items:[],
  totalItems:0,
  addItem:()=>{},
  removeItem:()=>{},
  removeAll:()=>{}
});

const calculateTotalItems = (items) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

const cartReducer = (state,action) =>{
  if(action.type==='ADD_ITEM'){
    const existingCartItemIndex = state.items.findIndex((item)=>item.id === action.item.id);

    const updatedItems = [...state.items];
    if(existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.item.quantity
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({...action.item});
    }
    return { ...state, items: updatedItems};
  }
  if(action.type==='REMOVE_ITEM'){
    const existingCartItemIndex = state.items.findIndex((item)=>item.id === action.id);
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if(existingCartItem.quantity===1){
      updatedItems.splice(existingCartItemIndex,1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity -1
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems};
  }

  if(action.type==='REMOVE_ALL'){
    return {items:[]};
  }

  return state;
};

export function CartContextProvider({children}){
  const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };

  const [cartState,dispatchCartAction] = useReducer(cartReducer,storedCart);

  function addItem(item){
    dispatchCartAction({type:'ADD_ITEM',item});
  }

  function removeItem(id){
    dispatchCartAction({type:'REMOVE_ITEM',id});
  }

  function removeAll(){
    dispatchCartAction({type:'REMOVE_ALL'});
  }

  const cartContext ={
    items:cartState.items,
    totalItems:calculateTotalItems(cartState.items),
    addItem,
    removeItem,
    removeAll
  };

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cartState));
  },[cartState]);

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
}

CartContextProvider.propTypes ={
  children:PropTypes.node.isRequired
};

export default CartContext;