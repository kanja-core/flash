import {Page} from 'playwright-core';

export async function submitForm(page: Page, formId: string): Promise<void> {
  console.log('Submitting form with id:', formId);
  await page.evaluate(id => {
    (document.getElementById(id) as HTMLFormElement).submit();
  }, formId);
}
