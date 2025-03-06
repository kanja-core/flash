// https://solucoes.receita.fazenda.gov.br/servicos/certidaointernet/pf/emitir
import 'dotenv/config';
import {BotAction} from '../../src/global';
import {BotCaptchaServiceFactory} from '../../src/modules/bot';

const url =
  'https://solucoes.receita.fazenda.gov.br/servicos/certidaointernet/pf/emitir';
const bot = BotCaptchaServiceFactory();

const actions: BotAction[] = [
  {
    type: 'disableAutoSolve',
    cat: 'captcha',
  },
  {
    type: 'goto',
    selector: url,
  },
  {
    type: 'screenshot',
    value: 'img/start.png',
  },
  {
    type: 'input',
    selector: '#NI',
    value: '15358587888',
  },
  {
    type: 'screenshot',
    value: 'img/form.png',
  },
  {
    type: 'wait',
    timeout: 500,
  },
  {
    type: 'solve',
    cat: 'captcha',
  },
  {
    type: 'screenshot',
    value: 'img/captcha.png',
  },
  {
    type: 'wait',
    timeout: 1000,
  },
  {
    type: 'screenshot',
    value: 'img/end.png',
  },
  {
    type: 'download',
    selector: '/Servicos/certidaointernet/pf/Emitir/EmProcessamento',
    value: '/tmp/file.pdf',
  },
];

bot
  .run(actions)
  .then(() => console.log('Bot finished'))
  .catch(err => console.error(err));
