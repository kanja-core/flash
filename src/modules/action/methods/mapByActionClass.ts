import {BotAction} from '../../../global';
import {ActionService} from '..';

export async function mapByActionClass(
  this: ActionService,
  action: BotAction,
): Promise<void> {
  switch (action.class) {
    case 'captcha':
      return this.captcha.mapByActionType(action);
    case 'debug':
      return this.debug.mapByActionType(action);
    default:
      return this.mapByActionType(action);
  }
}
