import {Page} from 'playwright-core';

export async function input(
  page: Page,
  selector: string,
  input: string,
): Promise<void> {
  console.log(`Filling input ${selector} with ${input}...`);
  await page.fill(selector, input);
}
