import { Switch } from 'react-router-dom';
import AddProduct from './components/Products/AddProduct';

import './App.css';
//  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 

function App() {
  return (
    <>
      <Switch>
        <Route path='/add-product'><AddProduct /></Route>
      </Switch>
    </>
  );
}

export default App;
