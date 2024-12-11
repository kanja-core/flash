import {Page} from 'playwright-core';

export async function screenshot(page: Page, savePath: string): Promise<void> {
  console.log('Taking screenshot...');
  await page.screenshot({path: savePath, fullPage: true});
}
