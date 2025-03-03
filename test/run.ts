import 'dotenv/config';
import { ParserServiceFactory } from "../src/modules/parser";
import {BotAction} from '../src/global';
import {BotCaptchaServiceFactory} from '../src/modules/bot';

const prompt_test: string = `
I want to get my tax certificate for the sao paulo state.

you should go to this website: https://www10.fazenda.sp.gov.br/CertidaoNegativaDeb/Pages/EmissaoCertidaoNegativa.aspx

fill out the form with my cpf: 52728162859

solve the captcha,

wait for a little time,

download my certificate by clicking the imprimir button.
`;

const parser = ParserServiceFactory();
const bot = BotCaptchaServiceFactory();

console.log("output:")

parser.exec(prompt_test).then((output) => {
    const actions: BotAction[] = output;
    console.log("Generated actions:");
    console.log(actions);
    bot
    .run(actions)
    .then(() => console.log('Bot finished'))
    .catch(err => console.error(err));
});

