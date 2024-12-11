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
    class: 'captcha',
  },
  {
    type: 'goto',
    selector: url,
  },
  {
    type: 'screenshot',
    value: 'img/start.png',
    class: 'debug',
  },
  {
    type: 'input',
    selector: '#MainContent_txtDocumento',
    value: '52728162859',
  },
  {
    type: 'screenshot',
    value: 'img/input.png',
    class: 'debug',
  },
  {
    type: 'wait',
    timeout: 500,
  },
  {
    type: 'solve',
    class: 'captcha',
  },
  {
    type: 'screenshot',
    value: 'img/captcha.png',
    class: 'debug',
  },
  {
    type: 'wait',
    timeout: 500,
  },
  {
    type: 'screenshot',
    value: 'img/end.png',
    class: 'debug',
  },
  {
    type: 'download',
    selector: '#MainContent_btnImpressao',
    value: 'pdf/www10.fazenda.sp.gov.br.pdf',
  },
];

bot
  .run({
    siteURL: url,
    actions,
  })
  .then(() => console.log('Bot finished'))
  .catch(err => console.error(err));
