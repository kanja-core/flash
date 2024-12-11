import {Page} from 'playwright-core';

export async function navigate(
  page: Page,
  url: string,
  timeout: number = 2 * 60 * 1000,
): Promise<void> {
  console.log(`Navigating to ${url}...`);
  await page.goto(url, {timeout: timeout});
}
