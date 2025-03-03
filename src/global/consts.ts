const envChecker = (ENV_VAR: string | undefined, name: string) => {
  if (!ENV_VAR) {
    throw new Error(`${name} is not set`);
  }
  return ENV_VAR;
};

// export const captchaActionName = 'captcha';
// export const captchaFillName = 'fillCaptcha';

export const browserConnectionURL = envChecker(
  process.env.BROWSER_CONNECTION_URL,
  'BROWSER_CONNECTION_URL',
);

export const OPENAI_API_KEY = envChecker(
  process.env.OPENAI_API_KEY,
  'OPENAI_API_KEY',
);

// export const CaptchaApiKey = envChecker(
//   process.env.CAPTCHA_API_KEY,
//   'CAPTCHA_API_KEY',
// );

// export const CaptchaApiURL = 'https://api.2captcha.com/';
