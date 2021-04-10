import React , { Component } from 'react' ;

import Button from '../../components/UI/Button/Button' ;

import Input from '../../components/UI/Input/Input' ;

import {connect} from 'react-redux' ;

import * as authActionCreators from '../../store/actions/index' ;

import classes from './Auth.css' ;

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

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
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

        const updatedControls = {
            ...this.state.controls ,
            [controlName] : {
                ...this.state.controls[controlName] ,
                value : event.target.value ,
                valid : this.checkValidity( event.target.value , this.state.controls[controlName].validation ),
                touched : true
            }
        }

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


        return (
            <div className={classes.Auth}>
                {form}
                <Button 
                btnType="Danger"
                clicked={this.switchAuthModeHandler} >SWITCH TO { this.state.isSignup ? "SIGNIN" : "SIGNUP" }</Button>
            </div>
        ) ;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email , password , isSignup ) => dispatch( authActionCreators.auth(email , password , isSignup ) )
    }
}

export default connect(null ,mapDispatchToProps)(Auth) ;