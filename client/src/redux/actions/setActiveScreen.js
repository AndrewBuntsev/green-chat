import createAction from '../createAction';
import * as actionTypes from '../actionTypes';

export default activeScreen => createAction(actionTypes.SET_ACTIVE_SCREEN, { activeScreen });