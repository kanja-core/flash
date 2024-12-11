// https://duc.prefeitura.sp.gov.br/certidoes/forms_anonimo/frmConsultaEmissaoCertificado.aspx
import 'dotenv/config';
import {BotAction} from '../../src/global';
import {BotCaptchaServiceFactory} from '../../src/modules/bot';

const url =
  'https://duc.prefeitura.sp.gov.br/certidoes/forms_anonimo/frmConsultaEmissaoCertificado.aspx';

const bot = BotCaptchaServiceFactory();

const actions: BotAction[] = [
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
    selector: '#MainContent_txtDocumento',
    value: '15358587888',
  },
  {
    type: 'screenshot',
    value: 'img/input.png',
  },
  {
    type: 'wait',
    timeout: 500,
  },
  {
    type: 'waitForCaptcha',
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
  // {
  //   type: 'download',
  //   selector: '/Servicos/certidaointernet/pf/Emitir/EmProcessamento',
  // },
];

bot
  .run({
    siteURL: url,
    actions,
  })
  .then(() => console.log('Bot finished'))
  .catch(err => console.error(err));
