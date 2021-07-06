import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/Header';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
//  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 

const Home = React.lazy(() => import('./components/Common/Home'));
const AddProduct = React.lazy(() => import('./components/Products/AddProduct'));
const ProductsList = React.lazy(() => import('./components/Products/ProductsList'));
const ProductDetails = React.lazy(() => import('./components/Products/ProductDetails'));
const Cart = React.lazy(() => import('./components/Cart/Cart'));
const Favorites = React.lazy(() => import('./components/Favorite/Favorites'));
const Order = React.lazy(() => import('./components/Order/Order'));

function App() {
  return (
    <>
      <Header />
      <div className='container my-4'>
        <ToastContainer />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path='/' exact>
              <Redirect to='/home' />
            </Route>
            <Route path='/home'><Home /></Route>
            <Route path='/add-product'><AddProduct /></Route>
            <Route path='/view-product' exact><ProductsList /></Route>
            <Route path='/view-product/:id' exact><ProductDetails /></Route>
            <Route path='/favorites' exact><Favorites /></Route>
            <Route path='/cart' exact><Cart /></Route>
            <Route path='/order' exact><Order /></Route>
            <Route path='*'>
              <Redirect to='/home' />
            </Route>
          </Switch>
        </ Suspense>
      </div >
    </>
  );
}

export default App;
