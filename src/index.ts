import 'dotenv/config';
import {Context, APIGatewayProxyResult, APIGatewayEvent} from 'aws-lambda';
import {BotCaptchaServiceFactory} from './modules/bot';

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);
  const bot = BotCaptchaServiceFactory();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'bot instance created',
    }),
  };
};
