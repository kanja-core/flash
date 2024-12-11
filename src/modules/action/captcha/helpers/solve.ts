import {CDPSession} from 'playwright-core';

export async function solve(
  client: CDPSession,
  timeout: number = 10 * 1000,
): Promise<void> {
  console.log('Solving CAPTCHA...');
  // @ts-ignore
  const {status} = await client.send('Captcha.solve', {
    detectTimeout: timeout,
  });
  console.log(`Captcha status: ${status}`);
}
