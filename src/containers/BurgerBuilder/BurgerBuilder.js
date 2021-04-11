import React, { Component } from 'react';

// import * as actionTypes from '../../store/actions/actionTypes' ;

import * as burgerBuilderActionCreators from '../../store/actions/index' ;

import { connect } from 'react-redux' ;

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        // ingredients: null,
        //totalPrice: 4,
        //purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount () {
        console.log(this.props);
        // axios.get( '/ingredients.json' )
        //     .then( response => {
        //         this.setState( { ingredients: response.data } );
        //     } )
        //     .catch( error => {
        //         this.setState( { error: true } );
        //     } );

        this.props.onInitIngredients();
    }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        
        return sum > 0 ;
    }

    // addIngredientHandler = ( type ) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     //const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    //     this.updatePurchaseState( updatedIngredients );
    // }

    // removeIngredientHandler = ( type ) => {
    //     const oldCount = this.state.ingredients[type];
    //     if ( oldCount <= 0 ) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     //const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    //     this.updatePurchaseState( updatedIngredients );
    // }

    purchaseHandler = () => {
        if( this.props.isAuthenticated ){
            this.setState( { purchasing: true } );
        }else{

            //change the authRedirect path so that after authentication , user is redirected to the checkout page
            this.props.onSetAuthRedirectPath( '/checkout' )
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });


        //onInitPurchase sets purchased in order reducer to false
        //If purchased in order reducer is true , we redirect from checout to "/"
        //Before checkout page is rendered  , each time purchased in order reducer is set to false
        //purchased in order reducer is used to tell , whether the burger has been purchased
        //If purchased is true then redirect to "/"

        //purchased is set to true when a purchase is successfull
        //purchased is set to false each time checkout page is rendered

        this.props.onInitPurchase() ;
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.props.ings ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} 
                        isAuth={ this.props.isAuthenticated }/>
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients ,
        price : state.burgerBuilder.totalPrice ,
        error : state.burgerBuilder.error ,
        isAuthenticated : state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(burgerBuilderActionCreators.addIngredient(ingName) ) ,
        onIngredientRemoved : (ingName) => dispatch( burgerBuilderActionCreators.removeIngredient(ingName) ) ,
        onInitIngredients : () => dispatch( burgerBuilderActionCreators.initIngredients() ),
        onInitPurchase : () => dispatch( burgerBuilderActionCreators.purchaseInit() ),
        onSetAuthRedirectPath : (path) => dispatch( burgerBuilderActionCreators.setAuthRedirectPath(path) )
    }
}

//We can wrap components with any number of hoc
//The hoc must spread the props to the components wrapped inside them
export default connect(mapStateToProps , mapDispatchToProps)( withErrorHandler( BurgerBuilder, axios ) );