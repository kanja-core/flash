import 'dotenv/config';
import {Context, APIGatewayProxyResult, APIGatewayEvent} from 'aws-lambda';
import {BotCaptchaServiceFactory} from './modules/bot';
import {fileReaderService} from './modules/fileReader';

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const body =
    typeof event.body === 'string' ? JSON.parse(event.body) : event.body || {};
  const {actions, request_id} = body;

  if (!Array.isArray(actions) || !request_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message:
          'Invalid input. `actions` must be an array and `request_id` is required.',
        event: JSON.stringify(event, null, 2),
      }),
    };
  }
  const bot = BotCaptchaServiceFactory();
  await bot.run(actions);

  const rawFile = await fileReaderService('/tmp/file.pdf');

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        request_id,
        file: rawFile.toString('base64'),
      },
      null,
      2,
    ),
  };
};
