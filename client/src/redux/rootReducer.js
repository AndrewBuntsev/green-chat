import * as actionTypes from './actionTypes';
import * as cookiesHelper from '../helpers/cookiesHelper';



export default (state, action) => {
    if (action.type == actionTypes.COMBINED_ACTION) {
        return action.payload.actions.reduce((state, action) => ({ ...state, ...handleAction(state, action) }), state);
    }

    return handleAction(state, action);
};



function handleAction(state, action) {
    switch (action.type) {
        case actionTypes.SET_CLIENT_DETAILS:
            const { clientDetails } = action.payload;
            cookiesHelper.setClietnId(clientDetails ? clientDetails.clientId : null);
            return { ...state, clientDetails: clientDetails };

        case actionTypes.SET_ACTIVE_SCREEN:
            return { ...state, activeScreen: action.payload.activeScreen };

        case actionTypes.SET_ACTIVE_CONTACT:
            return { ...state, activeContact: action.payload.activeContact };

        default:
            return state;
    }
}
