type BotActionClass = 'captcha' | 'debug';

type BotActionCaptchaType = 'wait' | 'solve' | 'disableAutoSolve';

type BotActionDebugType = 'screenshot' | 'url';

export type BotActionType =
  | 'form'
  | 'click'
  | 'delay'
  | 'goto'
  | 'input'
  | 'download'
  | BotActionCaptchaType
  | BotActionDebugType;

export type BotAction = {
  type: BotActionType;
  cat?: BotActionClass;
  selector?: string;
  value?: string;
  timeout?: number;
  validationURL?: string;
};
