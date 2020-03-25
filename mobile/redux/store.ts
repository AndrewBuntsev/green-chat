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

// initialize the store
const store = Redux.createStore(rootReducer, defaultState);
export default store;
