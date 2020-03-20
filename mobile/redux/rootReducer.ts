import { State } from './store';
import { Action } from './Action';
import { ActionType } from './ActionType';

export default (state: State, action: Action): State => {
  if (action.type == ActionType.COMBINED_ACTION) {
    return action.payload['actions'].reduce(
      (state, action) => ({ ...state, ...handleAction(state, action) }),
      state
    );
  }

  return handleAction(state, action);
};

const handleAction = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_SCREEN:
      const activeScreen = action.payload['activeScreen'];
      return { ...state, activeScreen };

    case ActionType.SET_CLIENT_DETAILS:
      const clientDetails = action.payload['clientDetails'];
      return { ...state, clientDetails };

    case ActionType.SET_ACTIVE_CONTACT:
      const activeContact = action.payload['activeContact'];
      return { ...state, activeContact };

    default:
      return state;
  }
};
