// import {Page} from 'playwright-core';
// import {CaptchaMethod} from '../../../../global';

// export const fillCaptchaByType = async (
//   page: Page,
//   method: CaptchaMethod,
//   response: string,
// ): Promise<void> => {
//   switch (method) {
//     case 'hCaptcha':
//       await page.evaluate(captchaResponse => {
//         (
//           document.getElementsByName(
//             'h-captcha-response',
//           )[0] as HTMLInputElement
//         ).value = captchaResponse;
//       }, response);
//       break;

//     case 'reCaptchaV2':
//       await page.evaluate(captchaResponse => {
//         (
//           document.getElementById('g-recaptcha-response') as HTMLInputElement
//         ).value = captchaResponse;
//       }, response);
//       break;

//     case 'reCaptchaV3':
//       await page.evaluate(captchaResponse => {
//         (
//           document.getElementsByName(
//             'g-recaptcha-response',
//           )[0] as HTMLInputElement
//         ).value = captchaResponse;
//       }, response);
//       break;

//     default:
//       throw new Error(`Unsupported CaptchaMethod: ${method}`);
//   }
// };
