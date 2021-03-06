import * as cookiesHelper from '../helpers/cookiesHelper';
import { AppState } from '../types/AppState';
import { Action } from './Action';
import { ActionType } from './ActionType';



export default (state: AppState, action: Action): AppState => {
    if (action.type == ActionType.COMBINED_ACTION) {
        return action.payload['actions'].reduce((state: AppState, action: Action) => ({ ...state, ...handleAction(state, action) }), state);
    }

    return handleAction(state, action);
};



function handleAction(state: AppState, action: Action): AppState {
    switch (action.type) {
        case ActionType.SET_CLIENT_DETAILS:
            const clientDetails = action.payload['clientDetails'];
            cookiesHelper.setClietnId(clientDetails ? clientDetails.clientId : null);
            return { ...state, clientDetails: clientDetails };

        case ActionType.SET_ACTIVE_SCREEN:
            return { ...state, activeScreen: action.payload['activeScreen'] };

        case ActionType.SET_ACTIVE_CONTACT:
            return { ...state, activeContact: action.payload['activeContact'] };

        default:
            return state;
    }
}
