import {CDPSession} from 'playwright-core';
import {mapByActionType} from './methods';

// create a class that stores wheather the auto solve is in or off
export class ActionCaptcha {
  constructor(protected client: CDPSession | null = null) {}

  public init(client: CDPSession): void {
    this.client = client;
  }

  mapByActionType = mapByActionType;
}
