import React , { Component } from 'react' ;

import { connect } from 'react-redux' ;
import { Redirect } from 'react-router';

import * as authActionCreators from '../../../store/actions/index' ;

class Logout extends Component{

    componentDidMount(){
        this.props.onLogout();
    }

    render(){
        return(
            <Redirect to="/auth" />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch( authActionCreators.logout() )
    }
}

export default connect( null , mapDispatchToProps)( Logout ) ;