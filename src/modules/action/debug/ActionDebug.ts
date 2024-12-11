import {CDPSession, Page} from 'playwright-core';
import {mapByActionType} from './methods';

export class ActionDebug {
  constructor(
    protected page: Page | null = null,
    protected client: CDPSession | null = null,
  ) {}

  public init(page: Page, client: CDPSession): void {
    this.page = page;
    this.client = client;
  }

  mapByActionType = mapByActionType;
}
