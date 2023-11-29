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

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path='audiophile-ecommerce-website/build' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="category/:categoryName" element={<Category />} />
          <Route path="product/:productName" element={<Product/>}/>
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
          <Header></Header>
          <Outlet></Outlet>
          <Footer></Footer>
          <Cart></Cart>
        </CartContextProvider>
      </UserProgressContextProvider>      
    </section>
  );
}

export default App;
