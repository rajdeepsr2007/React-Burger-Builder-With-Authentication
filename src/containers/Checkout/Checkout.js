import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import {connect} from 'react-redux' ;

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import * as orderActionCreators from '../../store/actions/order'

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // componentWillMount () {
    //     // const query = new URLSearchParams( this.props.location.search );
    //     // const ingredients = {};
    //     // let price = 0;
    //     // for ( let param of query.entries() ) {
    //     //     // ['salad', '1']
    //     //     if (param[0] === 'price') {
    //     //         price = param[1];
    //     //     } else {
    //     //         ingredients[param[0]] = +param[1];
    //     //     }
    //     // }
    //     this.setState( { ingredients: this.props.ings, totalPrice: this.props.price } );
    // }

    //Would not work because before this.props.onInitPurchase(); sets purchased in order reducer to false
    //The component will be rendered with the old props
    
    // componentWillMount() {
    //     this.props.onInitPurchase();
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        let summary = <Redirect to="/" />
        if( this.props.ings ){

            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null ;

            summary = (
                <div>
                    { purchasedRedirect }
                    <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} />
                </div>
                
            )
        }
        return (
           <div>
               {  }
               { summary }
           </div>
           
        );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);