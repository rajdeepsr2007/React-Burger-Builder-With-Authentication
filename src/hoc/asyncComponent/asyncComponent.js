//This higher order component or this code will allow us to load a component asynchronously
//i.e. only when we need it

import React , { Component } from 'react';

const asyncComponent = (importComponent) => {

    //we return a class here that extends Component

    return class extends Component{

            state = {
                //component will be set to dynamically loaded component 
                component : null
            }

            componentDidMount(){
                //importComponent is a reference to a function that returns a Promise
                importComponent()
                    .then( cmp => {
                        //cmp.default is the dynamically loaded component

                        //At some point we would have loaded the component that we want to use and it will be stored in the state
                        this.setState( { component : cmp.default } );
                    } );
            }

            render(){
                const C = this.state.component ;

                return C ? <C {...this.props} /> : null 
            }

        }
}

export default asyncComponent ;