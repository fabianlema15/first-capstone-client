import React from 'react';
import './App.css';
import Order from './components/Order/Order';
import Menu from './components/Menu/Menu';
import Login from './components/Login/Login';
import NewOrder from './components/Order/Neworder';
import Product from './components/Product/Product';
import Report from './components/Report/Report';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Route exact path="/" component={Login} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/sale" component={NewOrder} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/report" component={Report} />
      </div>
    </Router>
  );
}

export default App;
