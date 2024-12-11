import {ActionService} from '.';
import {ActionCaptchaFactory} from './captcha';
import {ActionDebugFactory} from './debug';

export const ActionServiceFactory = () => {
  return new ActionService(ActionCaptchaFactory(), ActionDebugFactory());
};
