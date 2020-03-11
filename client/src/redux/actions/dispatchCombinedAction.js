import createAction from '../createAction';
import * as actionTypes from '../actionTypes';

export default actions => createAction(actionTypes.COMBINED_ACTION, { actions });