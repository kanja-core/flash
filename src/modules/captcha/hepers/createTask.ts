import {CaptchaMethod} from '../../../global';

type CaptchTaskRequest = {
  type: string;
  websiteURL: string;
  websiteKey: string;
  isInvisible: boolean;
};

export const createTask: Record<
  CaptchaMethod,
  (websiteURL: string, websiteKey: string) => CaptchTaskRequest
> = {
  hCaptcha: (websiteURL: string, websiteKey: string) => {
    return {
      type: 'HCaptchaTaskProxyless',
      websiteURL: websiteURL,
      websiteKey: websiteKey,
      isInvisible: true,
    };
  },
  reCaptchaV2: (websiteURL: string, websiteKey: string) => {
    return {
      type: 'reCaptchaV2',
      websiteURL: websiteURL,
      websiteKey: websiteKey,
      isInvisible: true,
    };
  },
  reCaptchaV3: (websiteURL: string, websiteKey: string) => {
    return {
      type: 'reCaptchaV3',
      websiteURL: websiteURL,
      websiteKey: websiteKey,
      isInvisible: true,
    };
  },
};
