import * as actionTypes from '../actions/actionTypes' ;

import { updateObject } from '../utility' ;

const initialState = {
    orders : [] ,
    loading : false ,
    //purchased is used to tell if the burger has been purchased
    purchased : false
}

//We can make our switch case statement leaner with utility functions like updateObject

const reducer = (state = initialState , action) => {
    switch( action.type ){

        case actionTypes.PURCHASE_INIT : 
            return updateObject( state , { purchased : false } )

        case actionTypes.PURCHASE_BURGER_START :
            return updateObject( state , { loading : true } )

        case actionTypes.PURCHASE_BURGER_SUCCESS : 
            const newOrder = {
                ...action.orderData ,
                id : action.orderId
            }
            return {
                ...state ,
                orders : state.orders.concat( newOrder ) ,
                loading : false,
                purchased : true
            }
        case actionTypes.PURCHASE_BURGER_FAIL :
            return {
                ...state ,
                loading : false
            }
        case actionTypes.FETCH_ORDERS_START : 
            return {
                ...state ,
                loading : true
            }
        case actionTypes.FETCH_ORDERS_SUCEESS : 
            return {
                ...state ,
                orders : action.orders ,
                loading : false
            }
        case actionTypes.FETCH_ORDERS_FAIL :
            return {
                ...state ,
                loading : false
            }
        
        default :
            return state ;
    }
}

export default reducer ;