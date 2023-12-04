import React, { Fragment } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Category from './Components/Category/Category';
import Product from './Components/Product/Product';
import './scss/commons.scss';
import { UserProgressContextProvider } from './store/UserProgress';
import Cart from './Components/Cart/Cart';
import { CartContextProvider } from './store/CartContext';
import Checkout from './Components/Checkout/Checkout';
import { FormProvider } from './store/FormContext';
import OrderComplete from './Components/OrderComplete/OrderComplete';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path='audiophile-ecommerce-website/build' element={<Layout />}>
          <Route index path='' element={<Home />}></Route>
          <Route path="category/:categoryName" element={<Category />} />
          <Route path="product/:productName" element={<Product/>}/>
          <Route path="checkout" element={<Checkout/>}/>
        </Route>
      </Routes>
    </Fragment>
  );
}

function Layout() {
  return (
    <section>
      <UserProgressContextProvider>
        <CartContextProvider>
          <FormProvider>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
            <Cart></Cart>
            <OrderComplete></OrderComplete>
          </FormProvider>
        </CartContextProvider>
      </UserProgressContextProvider>      
    </section>
  );
}

export default App;
