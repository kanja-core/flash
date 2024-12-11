// https://docs.brightdata.com/scraping-automation/scraping-browser/cdp-functions/custom#manually-solving-captchas-examples
// // Node.js Puppeteer - manually solving CAPTCHA after navigation
// const page = await browser.newPage();
// const client = await page.target().createCDPSession();
// await client.send('Captcha.setAutoSolve', {autoSolve: false});
// await page.goto('https://site-with-captcha.com', {timeout: 2 * 60 * 1000});
// const {status} = await client.send('Captcha.solve', {detectTimeout: 30 * 1000});
// console.log('Captcha solve status:', status);

import {CDPSession} from 'playwright-core';

export async function disableAutoSolve(client: CDPSession): Promise<void> {
  console.log('Disabling CAPTCHA auto solve...');
  // @ts-ignore
  await client.send('Captcha.setAutoSolve', {autoSolve: false});
}
