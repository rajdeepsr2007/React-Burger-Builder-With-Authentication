import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderActionCreators from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner'

import { connect } from 'react-redux' ;

class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount() {
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchedOrders = [];
        //         for (let key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({loading: false, orders: fetchedOrders});
        //     })
        //     .catch(err => {
        //         this.setState({loading: false});
        //     });


        //We pass token stored in redux store to firebase in url 
        //so that only authenticated users can fetch orders
        this.props.onFetchOrders(this.props.token) ;
    }

    render () {

        let orders = <Spinner /> ;

        if( !this.props.loading){
            orders = (
                this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))
            )
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        orders : state.order.orders ,
        loading : state.order.loading ,
        token : state.auth.token
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : (token) => dispatch( orderActionCreators.fetchOrders(token) )
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(Orders, axios));