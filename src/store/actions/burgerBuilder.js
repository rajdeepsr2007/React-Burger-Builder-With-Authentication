import * as actionTypes from './actionTypes' ;

import axiosInstance from '../../axios-orders' ; 

export const addIngredient = (ingName) => {
    return {
        type : actionTypes.ADD_INGREDIENT ,
        ingredientName : ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type : actionTypes.REMOVE_INGREDIENT ,
        ingredientName : ingName
    }
}

export const setIngredients = ( ingredients ) => {
    return {
        type : actionTypes.SET_INGREDIENTS ,
        ingredients : ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type : actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

//initIngredients action fetches the ingredients from the server
//As it runs asynchronous code , it returns another function which dispatches an action
//We use redux-thunk to do it
export const initIngredients = () => {

    return dispatch => {
        axiosInstance.get( '/ingredients.json' )
                     .then( response => {
                         dispatch( setIngredients( response.data ) )
                     } )
                     .catch( error => {
                         dispatch( fetchIngredientsFailed() )
                     } )
    }

}