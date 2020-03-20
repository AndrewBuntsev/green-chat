import { ActionType } from '../ActionType';
import { Action } from '../Action';
import { Screen } from '../../enums/Screen';

export default (activeScreen: Screen): Action => ({
  type: ActionType.SET_ACTIVE_SCREEN,
  payload: { activeScreen }
});
