import { ActionType } from '../ActionType';
import { ClientDetails } from '../../types/ClientDetails';
import { Action } from '../Action';

export default (clientDetails: ClientDetails): Action => ({
  type: ActionType.SET_CLIENT_DETAILS,
  payload: { clientDetails }
});
