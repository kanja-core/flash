import {CaptchaService} from '.';
import {CaptchaApiKey, CaptchaApiURL} from '../../global';

export const CaptchaServiceFactory = () => {
  return new CaptchaService(CaptchaApiKey, CaptchaApiURL);
};
