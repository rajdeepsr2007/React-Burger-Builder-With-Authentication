import * as actionTypes from './actionTypes' ;

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
export const auth = (auth,password) => {
    return dispatch => {
        dispatch( authStart() ) ;
        //Write authentication code here
    }
}