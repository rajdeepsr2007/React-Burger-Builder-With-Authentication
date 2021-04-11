import * as actionTypes from './actionTypes' ;

import axios from 'axios' ;

//use this action to set a loading state and show spinner
export const authStart = () => {
    return {
        type : actionTypes.AUTH_START 
    }
}

export const authSuccess = (token , userId) => {
    return {
        type : actionTypes.AUTH_SUCEESS ,
        idToken : token ,
        userId : userId
    }
}

export const authFail = (error) => {
    return{
        type : actionTypes.AUTH_FAIL ,
        error : error
    }
}

export const logout = () => {
    return{
        type : actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch( logout() )
        } , expirationTime * 1000 )
    }
}

//Action with the async code
//isSignup tells whether to sign up or signin
export const auth = (email,password , isSignup) => {
    return dispatch => {
        dispatch( authStart() ) ;
        //Write authentication code here
        const authData = {
            email : email ,
            password : password , 
            returnSecureToken : true
        }

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFOPtt9NieRj2rtPDRs_5-jwWDMYRYXX8" ;

        if( !isSignup ){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDFOPtt9NieRj2rtPDRs_5-jwWDMYRYXX8";
        }

        axios.post( url , authData )
             .then( response => {
                console.log(response);
                dispatch( authSuccess( response.data.idToken , response.data.localId ) );
                dispatch( checkAuthTimeOut( response.data.expiresIn ) )
             } )
             .catch( error => {
                console.log(error);
                dispatch( authFail( error.response.data.error ) )
             } )
    }
}


export const setAuthRedirectPath = (path) => {
    return {
        type : actionTypes.SET_AUTH_REDIRECT_PATH ,
        path : path
    }
}