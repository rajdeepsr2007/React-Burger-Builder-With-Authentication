import React, { Component } from 'react';
import { Redirect, Route, Switch , withRouter } from 'react-router-dom';
import { connect } from 'react-redux' ;

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth' ;
import Logout from './containers/Auth/Logout/Logout' ;
import * as authActionCreators from './store/actions/index' ;

import asyncComponent from './hoc/asyncComponent/asyncComponent' ;

//lazy loading components
const asyncCheckout = asyncComponent( () => {
    return import( './containers/Checkout/Checkout' ) ;
} )

const asyncOrders = asyncComponent( () => {
  return import( './containers/Orders/Orders' ) ;
} )

class App extends Component {

  componentDidMount(){
    //When app loads try to authenticate if there is a valid token , expirationDate , userId in localStorage
    this.props.onTryAutoSignup();
  }

  render () {

    //guarding routes
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
      </Switch>
    ) ;

    if( this.props.isAuthenticated ){
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      )
    }

    

    return (
      <div>
        <Layout>
          { routes }
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup : () => dispatch( authActionCreators.authCheckState() )
  }
}

//Whenever having error with routing , Component having Router wrapped inside connect
//Wrap connect with withRouter
export default withRouter(connect( mapStateToProps , mapDispatchToProps)(App)) ;

