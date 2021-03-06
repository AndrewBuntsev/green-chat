import { ActionType } from '../ActionType';
import { Contact } from '../../types/Contact';
import { Action } from '../Action';

export default (activeContact?: Contact | null): Action => ({
  type: ActionType.SET_ACTIVE_CONTACT,
  payload: { activeContact }
});
