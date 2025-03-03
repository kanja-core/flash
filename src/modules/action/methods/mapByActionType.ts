import {BotAction} from '../../../global';
import {ActionService} from '..';
import {download, input, navigate, submitForm, timeout} from '../helpers';

export async function mapByActionType(
  this: ActionService,
  action: BotAction,
): Promise<void> {
  if (!this.page) throw new Error('Page has not been initialized');
  if (!this.client) throw new Error('Client has not been initialized');
  switch (action.type) {
    case 'form':
      if (!action.selector)
        throw new Error('Selector is required for form action');
      return submitForm(this.page, action.selector);
    case 'wait':
      if (!action.timeout)
        throw new Error('Timeout is required for wait action');
      return timeout(this.page, action.timeout);
    case 'goto':
      if (!action.selector)
        throw new Error('Selector is required for goto action');
      return navigate(this.page, action.selector);
    case 'input':
      if (!action.selector || !action.value)
        throw new Error('Selector and value are required for input action');
      return input(this.page, action.selector, action.value);
    case 'download':
      if (!action.selector || !action.value)
        throw new Error('Selector and value are required for download action');
      return download(this.page, this.client, action.selector, action.value);
    default:
      console.log(action.type);
      throw new Error('Invalid action type');
  }
}
