import {BotAction} from '../../../../global';
import {ActionCaptcha} from '..';
import {disableAutoSolve, solve, wait} from '../helpers';

export function mapByActionType(this: ActionCaptcha, action: BotAction) {
  if (!this.client) throw new Error('Client has not been initialized');

  switch (action.type) {
    case 'disableAutoSolve':
      return disableAutoSolve(this.client);
    case 'solve':
      return solve(this.client, action.timeout);
    case 'wait':
      return wait(this.client, action.timeout);
    default:
      throw new Error('Invalid action type');
  }
}