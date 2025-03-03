import 'dotenv/config';
import { ParserServiceFactory } from "../src/modules/parser";

const prompt_test: string = `
I want to get my tax certificate for the sao paulo state.
The website is https://www10.fazenda.sp.gov.br/CertidaoNegativaDeb/Pages/EmissaoCertidaoNegativa.aspx
my cpf is 52728162859.
You should input the cpf, 
it will go to a next page, then you should download the pdf, clicking the button with text imprimir.
Save it to /tmp/yc_certificate.pdf
`;

const parser = ParserServiceFactory();

console.log("output:")

parser.exec(prompt_test).then((output) => {
  console.log(output);
});