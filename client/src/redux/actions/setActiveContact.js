import createAction from '../createAction';
import * as actionTypes from '../actionTypes';

export default activeContact => createAction(actionTypes.SET_ACTIVE_CONTACT, { activeContact });