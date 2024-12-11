import {BotService} from '.';
import {BrowserServiceFactory} from '../browser';
import {ActionServiceFactory} from '../action';

export const BotCaptchaServiceFactory = () => {
  return new BotService(BrowserServiceFactory(), ActionServiceFactory());
};
