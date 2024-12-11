import {Page} from 'playwright-core';

export async function getCurrentUrl(page: Page): Promise<void> {
  const url = page.url();

  console.log(`Page url: ${url}`);
}
