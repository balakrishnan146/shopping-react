import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import AddProduct from './components/Products/AddProduct';
import ProductsList from './components/Products/ProductsList';
import ProductDetails from './components/Products/ProductDetails';
import Cart from './components/Cart/Cart';
import Favorites from './components/Favorite/Favorites';
import Order from './components/Order/Order';

import './App.css';
//  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 

function App() {
  return (
    <>
      <Header />
      <div className='container my-4'>
        <Switch>
          <Route path='/add-product'><AddProduct /></Route>
          <Route path='/view-product' exact><ProductsList /></Route>
          <Route path='/view-product/:id' exact><ProductDetails /></Route>
          <Route path='/favorites' exact><Favorites /></Route>
          <Route path='/cart' exact><Cart /></Route>
          <Route path='/order' exact><Order /></Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
