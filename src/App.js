import { Route, Switch } from 'react-router-dom';
import AddProduct from './components/Products/AddProduct';
import ProductsList from './components/Products/ProductsList';

import './App.css';
//  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 

function App() {
  return (
    <>
      <div className='container my-4'>
        <Switch>
          <Route path='/add-product'><AddProduct /></Route>
          <Route path='/view-product' exact><ProductsList /></Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
