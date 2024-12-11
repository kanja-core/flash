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
    type: captchaFillName,
    validationURL: url,
  },
  {
    type: 'input',
    selector: '#NI',
    value: '15358587888',
    validationURL: url,
  },
  {
    type: 'wait',
    timeout: 500,
  },
  {
    type: 'form',
    selector: 'frmInfParam',
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
  })
  .then(() => console.log('Bot finished'))
  .catch(err => console.error(err));
