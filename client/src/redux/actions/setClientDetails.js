import createAction from '../createAction';
import * as actionTypes from './../actionTypes';

export default clientDetails => createAction(actionTypes.SET_CLIENT_DETAILS, { clientDetails });