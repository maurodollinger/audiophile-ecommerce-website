import React, { Fragment } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Category from './Components/Category/Category';
import './scss/commons.scss';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path='audiophile-ecommerce-website/build' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="category/:categoryName" element={<Category />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

function Layout() {
  return (
    <section>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </section>
  );
}

export default App;
