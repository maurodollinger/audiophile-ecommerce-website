import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
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
import SmoothScroll from './Components/Animations/SmoothScroll';
import PageTransition from './Components/Animations/PageTransition';
import { baseTransition } from './Components/Animations/motion';

function App() {
  return (
    <Fragment>
      <MotionConfig reducedMotion='user' transition={baseTransition}>
        <SmoothScroll>
          <Routes>
            <Route basename='/audiophile-ecommerce-website/*' element={<Layout />}>
              <Route index path='/' element={<Home />} />
              <Route path='/category/:categoryName' element={<Category />} />
              <Route path='/product/:productName' element={<Product />} />
              <Route path='/checkout' element={<Checkout />} />
            </Route>
          </Routes>
        </SmoothScroll>
      </MotionConfig>
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
            <PageTransition></PageTransition>
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
