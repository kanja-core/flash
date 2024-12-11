import 'dotenv/config';
import {BotAction, captchaActionName, captchaFillName} from '../src/global';
import {BotCaptchaServiceFactory} from '../src/modules/bot';

const url =
  'https://solucoes.receita.fazenda.gov.br/servicos/certidaointernet/pf/emitir';

const targetURL =
  'https://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/pf/emitir/Verificar';

// https://solucoes.receita.fazenda.gov.br/servicos/certidaointernet/pf/emitir
const bot = BotCaptchaServiceFactory();

const actions: BotAction[] = [
  {
    type: 'goto',
    selector: url,
    validationURL: url,
  },
  {
    type: 'download',
    selector: '/Servicos/certidaointernet/pf/Emitir/EmProcessamento',
  },
];

bot
  .run({
    siteURL: url,
    actions,
    captcha: {
      key: '4a65992d-58fc-4812-8b87-789f7e7c4c4b',
      type: 'hCaptcha',
    },
  })
  .then(() => console.log('Bot finished'))
  .catch(err => console.error(err));
