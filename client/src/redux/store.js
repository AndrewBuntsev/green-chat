import * as Redux from 'redux';
import Cookies from 'universal-cookie';

import rootReducer from './rootReducer';
import * as COOKIES from './../const/cookies';


const cookies = new Cookies();


const defaultState = {
    clientId: cookies.get(COOKIES.CLIENT_ID)
};


// apply redux extension for chrome only
const isChrome = !!window['chrome'] && (!!window['chrome'].webstore || !!window['chrome'].runtime);
const middleware = isChrome ? Redux.compose(window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()) : undefined;

// initialize the store
const store = Redux.createStore(rootReducer, defaultState, middleware);
export default store;
