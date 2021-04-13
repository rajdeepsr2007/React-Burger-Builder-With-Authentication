import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware , combineReducers , compose } from 'redux';

import thunk from 'redux-thunk' ;

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order' ;
import authReducer from './store/reducers/auth' ;

//enable redux dev tools only in development mode
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    burgerBuilder : burgerBuilderReducer ,
    order : orderReducer ,
    auth : authReducer
})

const store = createStore(rootReducer , composeEnhancers( applyMiddleware( thunk ) ) );

//Set <BrowserRouter basename="/my-app/" > If we are seving our app from example.com

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
