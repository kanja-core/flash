import axios from 'axios';
import {CaptchaService} from '..';

type CaptchaFetchResponseSolution = {
  token: string;
  userAgent: string;
  gRecaptchaResponse: string;
  respKey: string;
};

type CaptchaFetchResponse = {
  solution: CaptchaFetchResponseSolution;
  errorId: number;
  status: 'ready';
  errorDescription: string;
};

export async function fetch(
  this: CaptchaService,
  attempts = 10,
  interval_s = 5,
): Promise<void> {
  if (!this.taskId) {
    throw new Error('No CAPTCHA task ID found. Call send() first.');
  }
  // Poll for solution
  for (let i = 0; i < attempts; i++) {
    console.log(`Attempt ${i + 1} of ${attempts} to fetch CAPTCHA solution...`);
    await this.delay(interval_s * 10e2); // Poll every interval_s seconds

    const {data: getResultData} = (await axios.post(
      `${this.apiUrl}/getTaskResult`,
      {
        clientKey: this.apiKey,
        taskId: this.taskId,
      },
    )) as {data: CaptchaFetchResponse};

    if (getResultData.status === 'ready') {
      console.log('CAPTCHA solved!');
      this.solution = {
        solution: getResultData.solution.gRecaptchaResponse,
        token: getResultData.solution.token,
        userAgent: getResultData.solution.userAgent,
        type: 'reCaptchaV2',
      };
      return;
    } else if (getResultData.errorId !== 0) {
      throw new Error(
        `Error retrieving CAPTCHA result: ${getResultData.errorDescription}`,
      );
    }
  }
  throw new Error('CAPTCHA solution timed out');
}
