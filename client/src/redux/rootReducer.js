import Cookies from 'universal-cookie';

import * as actionTypes from "./actionTypes";
import * as COOKIES from './../const/cookies';
import * as screens from './../const/screens';

const cookies = new Cookies();

export default (state, action) => {
    switch (action.type) {
        case actionTypes.SET_CLIENT_DETAILS:
            const { clientDetails } = action.payload;
            cookies.set(COOKIES.CLIENT_ID, clientDetails.clientId);
            return { ...state, clientDetails: clientDetails, activeScreen: screens.MAIN };

        case actionTypes.SET_ACTIVE_SCREEN:
            return { ...state, activeScreen: action.payload.activeScreen };

        default:
            return state;
    }
};
