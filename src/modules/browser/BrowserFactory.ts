import {BrowserService} from '.';
import {browserConnectionURL} from '../../global';

export const BrowserServiceFactory = () => {
  return new BrowserService(browserConnectionURL);
};
