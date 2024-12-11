import {
  chromium,
  Browser as PlaywrightBrowser,
  Page,
  CDPSession,
} from 'playwright-core';

export class BrowserService {
  protected browser: PlaywrightBrowser | null = null;
  protected page: Page | null = null;
  protected client: CDPSession | null = null;

  constructor(private connectionURL: string) {}

  public async init(): Promise<void> {
    console.log('Launching browser...');
    this.browser = await chromium.connectOverCDP(this.connectionURL);
    const context = await this.browser.newContext({acceptDownloads: true}); // Enable downloads
    // const context = await this.browser.newContext();
    this.page = await context.newPage();
    this.client = await this.page.context().newCDPSession(this.page);
  }

  public async close(): Promise<void> {
    if (this.browser) {
      console.log('Closing browser...');
      await this.browser.close();
    }
  }

  public getPage(): Page {
    if (!this.page)
      throw new Error('Page has not been initialized. Call launch() first.');
    return this.page;
  }

  public getClient(): CDPSession {
    if (!this.client)
      throw new Error('Client has not been initialized. Call launch() first.');
    return this.client;
  }
}
