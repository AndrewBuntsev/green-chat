import Cookies from 'universal-cookie';

import * as actionTypes from "./actionTypes";
import * as COOKIES from './../const/cookies';
import * as screens from './../const/screens';

const cookies = new Cookies();

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
            cookies.set(COOKIES.CLIENT_ID, clientDetails.clientId);
            return { ...state, clientDetails: clientDetails };

        case actionTypes.SET_ACTIVE_SCREEN:
            return { ...state, activeScreen: action.payload.activeScreen };

        default:
            return state;
    }
}
