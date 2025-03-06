// https://www10.fazenda.sp.gov.br/CertidaoNegativaDeb/Pages/EmissaoCertidaoNegativa.aspx
import 'dotenv/config';
import {BotAction} from '../../src/global';
import {BotCaptchaServiceFactory} from '../../src/modules/bot';

const url =
  'https://www10.fazenda.sp.gov.br/CertidaoNegativaDeb/Pages/EmissaoCertidaoNegativa.aspx';

const bot = BotCaptchaServiceFactory();

const actions: BotAction[] = [
  {
    type: 'disableAutoSolve',
    cat: 'captcha',
  },
  {
    type: 'goto',
    selector:
      'https://www10.fazenda.sp.gov.br/CertidaoNegativaDeb/Pages/EmissaoCertidaoNegativa.aspx',
  },
  {
    type: 'screenshot',
    value: 'img/start.png',
    cat: 'debug',
  },
  {
    type: 'input',
    selector: '#MainContent_txtDocumento',
    value: '52728162859',
  },
  {
    type: 'screenshot',
    value: 'img/input.png',
    cat: 'debug',
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
    cat: 'debug',
  },
  {
    type: 'wait',
    timeout: 500,
  },
  {
    type: 'screenshot',
    value: 'img/end.png',
    cat: 'debug',
  },
  {
    type: 'download',
    selector: '#MainContent_btnImpressao',
    value: '/tmp/file.pdf',
  },
];

bot
  .run(actions)
  .then(() => console.log('Bot finished'))
  .catch(err => console.error(err));
