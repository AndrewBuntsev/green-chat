import Cookies from 'universal-cookie';

import * as actionTypes from "./actionTypes";
import * as COOKIES from './../const/cookies';

const cookies = new Cookies();

export default (state, action) => {
    switch (action.type) {
        case actionTypes.SET_CLIENT_ID:
            const { clientId } = action.payload;
            cookies.set(COOKIES.CLIENT_ID, clientId);
            return { ...state, clientId: clientId };

        default:
            return state;
    }
};
