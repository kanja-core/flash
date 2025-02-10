// Create a bot class, It should have a BrowserService instance, CaptchaService instance and a page service instance.

import {BrowserService} from '../browser';
import {BotAction} from '../../global';
import {ActionService} from '../action';

export class BotService {
  constructor(
    protected browserService: BrowserService,
    protected actionService: ActionService,
  ) {}

  public async run(actions: BotAction[]): Promise<void> {
    await this.browserService.init();
    this.actionService.init(
      this.browserService.getPage(),
      this.browserService.getClient(),
    );
    for (const action of actions) {
      await this.actionService.mapByActionClass(action);
    }
  }
}
