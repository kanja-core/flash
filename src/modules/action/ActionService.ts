import {CDPSession, Page} from 'playwright-core';
import {mapByActionType, mapByActionClass} from './methods';
import {ActionCaptcha} from './captcha';
import {ActionDebug} from './debug';
export class ActionService {
  constructor(
    protected captcha: ActionCaptcha,
    protected debug: ActionDebug,
    protected page: Page | null = null,
    protected client: CDPSession | null = null,
  ) {}

  public init(page: Page, client: CDPSession): void {
    this.page = page;
    this.client = client;
    this.captcha.init(client);
    this.debug.init(page, client);
  }

  mapByActionType = mapByActionType;
  mapByActionClass = mapByActionClass;
}

// action examples
// https://github.com/luminati-io/sbr-examples
