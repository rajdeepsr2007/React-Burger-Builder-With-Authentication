import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null ,
    totalPrice: 4 ,
    error : false ,
    //building tells whether we are currently building a burger
    building : true
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

//We can extract the code in the switch cases into functions to make the switch case statement leaner
const addIngredient = ( state , action ) => {
    const updatedIngredient = { [action.ingredientName] :  state.ingredients[action.ingredientName] + 1 } ;
    const updatedIngredients = updateObject(state.ingredients , updatedIngredient )
    return updateObject( state , { 
        ingredients : updatedIngredients ,
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName] ,
        //building is set to true to tell we are building a burger
        building : true
    }  )           
}

const removeIngredient = ( state , action ) => {
    const updatedIng = { [action.ingredientName] :  state.ingredients[action.ingredientName] - 1 } ;
    const updatedIngs = updateObject(state.ingredients , updatedIng )
    return updateObject( state , { 
        ingredients : updatedIngs ,
        totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName] ,
        //building is set to true to tell we are building a burger
        building : true
    }  )
}

//We can make our switch case statement leaner by using utility functions like updateObject

const reducer = (state = initialState, action) => {

    switch( action.type ){
        case actionTypes.ADD_INGREDIENT :
            return addIngredient( state , action )

        case actionTypes.REMOVE_INGREDIENT :
            return removeIngredient( state , action )

        case actionTypes.SET_INGREDIENTS :
            return {
                ...state ,
                ingredients : action.ingredients,
                totalPrice : 4 ,
                error : false ,
                building : false
            }   
        case actionTypes.FETCH_INGREDIENTS_FAILED :
            return {
                ...state ,
                error : true
            } 
        default :
            return state ;
    }

    return state ;
};

export default reducer;