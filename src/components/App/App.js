import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import MenuPage from '../../routes/MenuPage'
import UserPage from '../../routes/UserPage'
import ClientPage from '../../routes/ClientPage'
import ProductPage from '../../routes/ProductPage'
import PromotionPage from '../../routes/PromotionPage'
import OrderPage from '../../routes/OrderPage'
import OrderDetailPage from '../../routes/OrderDetailPage'
import Login from '../../routes/LoginPage';
import ReportPage from '../../routes/ReportPage';
import ChangePassPage from '../../routes/ChangePassPage';
import NotFoundPage from '../../routes/NotFoundPage'
import NotAccess from '../../routes/NotAccess'
import PrivateRoute from '../Utils/PrivateRoute'

import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import IdleService from '../../services/idle-service'

class App extends React.Component {

  componentDidMount() {
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle)

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.regiserIdleTimerResets()

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets()
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry()
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken()
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry()
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets()
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate()
  }

  render(){
    return (
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/menu" component={MenuPage} />
            <PrivateRoute exact path="/products" component={ProductPage} />
            <PrivateRoute exact path="/clients" component={ClientPage} />
            <PrivateRoute exact path="/users" component={UserPage} />
            <PrivateRoute exact path="/promotions" component={PromotionPage} />
            <PrivateRoute exact path="/orders" component={OrderPage} />
            <PrivateRoute exact path="/orders/new" component={OrderDetailPage} />
            <PrivateRoute exact path="/order/:orderId" component={OrderDetailPage} />
            <PrivateRoute exact path="/reports" component={ReportPage} />
            <PrivateRoute exact path="/password" component={ChangePassPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/notaccess" component={NotAccess} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
    );
  }

}

export default App;
