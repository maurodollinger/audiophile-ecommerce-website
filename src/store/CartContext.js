import React, { useReducer } from 'react';
import { createContext } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext({
  items:[],
  totalItems:0,
  addItem:()=>{},
  removeItem:()=>{}
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
    console.log('remove item');
  }

  return state;
};

export function CartContextProvider({children}){
  const [cart,dispatchCartAction] = useReducer(cartReducer,{items:[]});

  function addItem(item){
    dispatchCartAction({type:'ADD_ITEM',item});
  }

  function removeItem(){
    dispatchCartAction({type:'REMOVE_ITEM'});
  }
  const cartContext ={
    items:cart.items,
    totalItems:calculateTotalItems(cart.items),
    addItem,
    removeItem
  };

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