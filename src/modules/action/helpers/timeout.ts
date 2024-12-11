import {Page} from 'playwright-core';

export async function timeout(page: Page, ms: number): Promise<void> {
  console.log(`Waiting for ${ms}ms...`);
  await delay(ms);
}

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}
