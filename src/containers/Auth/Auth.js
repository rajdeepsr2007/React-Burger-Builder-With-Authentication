import React , { Component } from 'react' ;

import Button from '../../components/UI/Button/Button' ;

import Input from '../../components/UI/Input/Input' ;

import {connect} from 'react-redux' ;

import * as authActionCreators from '../../store/actions/index' ;

import classes from './Auth.css' ;

import Spinner from '../../components/UI/Spinner/Spinner' ;
import { Redirect } from 'react-router';

import {checkValidity, updateObject} from '../../shared/utility' ;

class Auth extends Component {

    state = {
        controls : {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                    required: true ,
                    isEmail : true
                },
                valid: false,
                touched: false
            },
            password : {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true ,
                    minLength : 6
                },
                valid: false,
                touched: false
            }
        },

        isSignup : true
    }

    componentDidMount(){

        //set authRedirect path to "/" after authentication if user is not building a burger
        if( !this.props.building && this.props.authRedirect!=='/' ){
            this.props.onSetAuthRedirectPath('/')
        }
    }

    inputChangedHandler = ( event , controlName ) => {
       
        // const isValid = this.checkValidity( event.target.value , this.state.controls[controlName].validation ) ;
        
        // const updatedControl = {
        //     ...this.state.controls[controlName] , 
        //     value : event.target.value , 
        //     touched : true , 
        //     valid : isValid 
        // } ;

        // const updatedControls = { 
        //     ...this.state.controls , 
        //     [controlName] : updatedControl 
        // } ;

        const updatedControls = updateObject(
            this.state.controls , {
                [controlName] : updateObject(
                                this.state.controls[controlName] , {
                                value : event.target.value ,
                                valid : checkValidity( event.target.value , this.state.controls[controlName].validation ),
                                touched : true
                } )
            }
        )
        

        this.setState( { controls : updatedControls } );

    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth( this.state.controls.email.value , this.state.controls.password.value , this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState( prevState => {
            return {
                ...this.state ,
                isSignup : !prevState.isSignup
            }
        } )
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success">Submit</Button>
            </form>
        );

        if( this.props.loading ){
            form = <Spinner />
        }

        let errorMessage = null ;

        if( this.props.error ){
            errorMessage = (
                <p>{ this.props.error.message }</p>
            )
        }


        let authRedirect = null ;

        //Redirect if authenticated
        if( this.props.isAuthenticated ){
            authRedirect = <Redirect to={this.props.authRedirect} />
        }

        return (
            <div className={classes.Auth}>
                { authRedirect }
                {errorMessage}
                {form}
                <Button 
                btnType="Danger"
                clicked={this.switchAuthModeHandler} >SWITCH TO { this.state.isSignup ? "SIGNIN" : "SIGNUP" }</Button>
            </div>
        ) ;
    }
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading ,
        error : state.auth.error ,
        isAuthenticated : state.auth.token !== null ,
        building : state.burgerBuilder.building,
        authRedirect : state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email , password , isSignup ) => dispatch( authActionCreators.auth(email , password , isSignup ) ) ,
        onSetAuthRedirectPath : (path) => dispatch( authActionCreators.setAuthRedirectPath(path) )
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(Auth) ;