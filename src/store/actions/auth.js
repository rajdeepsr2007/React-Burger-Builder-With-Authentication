import * as actionTypes from './actionTypes' ;

import axios from 'axios' ;

//use this action to set a loading state and show spinner
export const authStart = () => {
    return {
        type : actionTypes.AUTH_START 
    }
}

export const authSuccess = (authData) => {
    return {
        type : actionTypes.AUTH_SUCEESS ,
        authData : authData
    }
}

export const authFail = (error) => {
    return{
        type : actionTypes.AUTH_FAIL ,
        error : error
    }
}

//Action with the async code
export const auth = (email,password) => {
    return dispatch => {
        dispatch( authStart() ) ;
        //Write authentication code here
        const authData = {
            email : email ,
            password : password , 
            returnSecureToken : true
        }
        axios.post( "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFOPtt9NieRj2rtPDRs_5-jwWDMYRYXX8" , authData )
             .then( response => {
                console.log(response);
                dispatch( authSuccess( response.data ) )
             } )
             .catch( error => {
                console.log(error);
                dispatch( authFail( error ) )
             } )
    }
}