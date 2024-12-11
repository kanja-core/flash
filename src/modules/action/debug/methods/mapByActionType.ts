import {BotAction} from '../../../../global';
import {ActionDebug} from '..';
import {getCurrentUrl, screenshot} from '../helpers';

export function mapByActionType(this: ActionDebug, action: BotAction) {
  if (!this.page) throw new Error('Page has not been initialized');
  if (!this.client) throw new Error('Client has not been initialized');

  switch (action.type) {
    case 'screenshot':
      if (!action.value)
        throw new Error('Value is required for screenshot action');
      return screenshot(this.page, action.value);
    case 'url':
      return getCurrentUrl(this.page);
    default:
      throw new Error('Invalid action type');
  }
}
