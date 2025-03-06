import 'dotenv/config';
import {Context, APIGatewayProxyResult, APIGatewayEvent} from 'aws-lambda';
import {BotCaptchaServiceFactory} from './modules/bot';
import {fileReaderService} from './modules/fileReader';

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  console.log('event', event);
  const body =
    typeof event.body === 'string' ? JSON.parse(event.body) : event.body || {};
  const {actions, request_id} = body;

  if (!Array.isArray(actions) || !request_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message:
          `Invalid input. actions must be an array and request_id is required
          actions: ${typeof actions}, request_id: ${typeof request_id}
          event: ${JSON.stringify(event, null, 2)}
          `,
        event: JSON.stringify(event, null, 2),
      }),
    };
  }
  const bot = BotCaptchaServiceFactory();
  await bot.run(actions);

  const rawFile = await fileReaderService('/tmp/file.pdf');
  console.log(typeof rawFile);
  console.log(rawFile.length);

  const file = Buffer.from(rawFile).toString('base64');
  console.log(typeof file);
  console.log(file.length);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        request_id,
        file: file,
      },
      null,
      2,
    ),
  };
};
