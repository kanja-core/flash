import {Page} from 'playwright-core';

export async function click(page: Page, selector: string): Promise<void> {
  console.log(`Clicking selector ${selector}...`);
  await page.click(selector);
}
