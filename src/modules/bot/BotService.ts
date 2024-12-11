// Create a bot class, It should have a BrowserService instance, CaptchaService instance and a page service instance.

import {BrowserService} from '../browser';
import {BotAction} from '../../global';
import {ActionService} from '../action';

type BotOptions = {
  siteURL: string;
  actions: BotAction[]; // key: action name, value: selector
};

export class BotService {
  constructor(
    protected browserService: BrowserService,
    protected actionService: ActionService,
  ) {}

  public async run(options: BotOptions): Promise<void> {
    await this.browserService.init();
    this.actionService.init(
      this.browserService.getPage(),
      this.browserService.getClient(),
    );
    for (const action of options.actions) {
      await this.actionService.mapByActionClass(action);
    }
  }
}
