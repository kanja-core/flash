import {CaptchaMethod, CaptchaSolution} from '../../global';
import {send, fetch} from './methods';

export class CaptchaService {
  protected taskId: string | null = null;
  public solution: CaptchaSolution | null = null;

  constructor(
    protected apiKey: string,
    protected apiUrl: string,
  ) {}

  send = send;
  fetch = fetch;

  async resolve(
    type: CaptchaMethod,
    websiteURL: string,
    websiteKey: string,
  ): Promise<void> {
    await this.send(type, websiteURL, websiteKey);
    await this.fetch();
    if (!this.solution) throw new Error('CAPTCHA solution not found');
    this.solution.type = type;
  }

  protected delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
