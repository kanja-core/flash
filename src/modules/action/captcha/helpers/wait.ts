import {CDPSession} from 'playwright-core';

export async function wait(
  client: CDPSession,
  timeout: number = 10 * 1000,
): Promise<void> {
  console.log('Solving CAPTCHA...');
  // @ts-ignore
  const {status} = await client.send('Captcha.waitForSolve', {
    detectTimeout: timeout,
  });
  console.log(`Captcha status: ${status}`);
}
