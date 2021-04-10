import * as actionTypes from './actionTypes' ;

import axiosInstance from '../../axios-orders' ;

export const purchaseBurgerSuccess = (id , orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS ,
        orderId : id ,
        orderData : orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL ,
        error : error
    }
}


export const purchaseBurgerStart = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}



export const purchaseBurger = (orderData , token) => {

    //If we have to redirect after placing the order
    //This action creator can take this.props.history as an argument
    //We can use it to redirect after we dispatch the purchaseBurgerSuccess action

    return dispatch => {
        dispatch( purchaseBurgerStart() );
        axiosInstance.post( '/orders.json?auth=' + token , orderData )
                     .then( response => {
                         console.log(response.data) ;
                         dispatch( purchaseBurgerSuccess( response.data.name , orderData ) )
                     } )
                     .catch( error => {
                         dispatch( purchaseBurgerFail( error ) )
                     } )
    }
}

//Before checkout page is rendered  , each time purchased in order reducer is set to false
//purchased in order reducer is used to tell , whether the burger has been purchased
//If purchased then redirect to "/"

//purchased is set to true when a purchase is successfull
//purchased is set to false each time checkout page is rendered

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
}


export const fetchOrdersSuccess = (orders) => {
    return {
        type : actionTypes.FETCH_ORDERS_SUCEESS ,
        orders : orders
    }
}

export const fetchedOrdersFail = (error) => {
    return {
        type : actionTypes.FETCH_ORDERS_FAIL ,
        error : error
    }
}

export const fetchOrdersStart = () => {
    return {
        type : actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token) => {
    return (dispatch , getState) => {
        dispatch( fetchOrdersStart() )
        //We pass token stored in redux store to firebase in url 
        //so that only authenticated users can fetch orders
        axiosInstance.get( '/orders.json?auth=' + token )
                     .then( response => {
                        const fetchedOrders = [];
                        for (let key in response.data) {
                            fetchedOrders.push({
                                ...response.data[key],
                                id: key
                            });
                        }
                        dispatch( fetchOrdersSuccess( fetchedOrders ) )
                     } )
                     .catch( error => {
                         dispatch( fetchedOrdersFail(error) )
                     } )
    }
}

