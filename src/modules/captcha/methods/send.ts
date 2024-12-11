import axios from 'axios';
import {createTask} from '../hepers';
import {CaptchaService} from '..';
import {CaptchaMethod} from '../../../global';

export async function send(
  this: CaptchaService,
  type: CaptchaMethod,
  websiteURL: string,
  websiteKey: string,
): Promise<void> {
  console.log('Creating CAPTCHA task...');
  try {
    const {data: createTaskData} = await axios.post(
      `${this.apiUrl}/createTask`,
      {
        clientKey: this.apiKey,
        task: createTask[type](websiteURL, websiteKey),
      },
    );

    if (createTaskData.errorId !== 0) {
      throw new Error(
        `Error creating CAPTCHA task: ${createTaskData.errorDescription}`,
      );
    }

    this.taskId = createTaskData.taskId;
  } catch (error) {
    console.error('Error sending CAPTCHA:', error);
  }
}
