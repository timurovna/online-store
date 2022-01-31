
import React from 'react';
import Login from './LoginPage.js'
import ProductsList from './ProductsList'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ProductPage from './ProductPage.js';
import EditProduct from './EditProduct.js';

const App = () => {
  return (
        <div>
          <BrowserRouter>
            <Switch>
              <Route path='/' exact component={Login} />
              <PrivateRoute component={<ProductsList />} path="/products" />
              <PrivateRoute component={<ProductPage />} exact path="/productdetails" /> 
              <PrivateRoute component={<EditProduct />} exact path="/productdetails/edit"/>
              <PrivateRoute component={<EditProduct />} exact path="/add"/>
            </Switch>
          </BrowserRouter>
        </div>
        )
}

export default App;
