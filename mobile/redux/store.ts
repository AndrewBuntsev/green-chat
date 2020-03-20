import * as Redux from 'redux';

import rootReducer from './rootReducer';
import { ClientDetails } from '../types/ClientDetails';
import { Contact } from '../types/Contact';
import { Screen } from '../enums/Screen';

export type State = {
  activeScreen: Screen;
  clientDetails: ClientDetails;
  activeContact: Contact;
};

const defaultState: State = {
  activeScreen: Screen.SPLASH,
  clientDetails: null,
  activeContact: null
};

// apply redux extension for chrome only
const isChrome = !!window['chrome'] && (!!window['chrome'].webstore || !!window['chrome'].runtime);
const middleware = isChrome ? Redux.compose(window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()) : undefined;

// initialize the store
const store = Redux.createStore(rootReducer, defaultState, middleware);
export default store;
