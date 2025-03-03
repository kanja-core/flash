import { promises as fs } from 'fs';
import * as path from 'path';
import { z } from 'zod';
import { OpenAI } from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { BotActionSchema } from '../../global/zod';

const BotActionsSchema = z.object({
  bot_actions: z.array(BotActionSchema),
});

export class ParserService {
  constructor(
    protected openai: OpenAI,
    protected prompt: string,
  ) {}

  private async readHtmlFiles(directory: string = './files'): Promise<string> {
    const dirPath = path.resolve(directory);
    const fileNames = await fs.readdir(dirPath);
    let combinedHtml = '';
    for (const fileName of fileNames) {
      const filePath = path.join(dirPath, fileName);
      const stat = await fs.stat(filePath);
      if (stat.isFile() && fileName.toLowerCase().endsWith('.html')) {
        const content = await fs.readFile(filePath, 'utf8');
        combinedHtml += content + "\n\n";
      }
    }
    return combinedHtml;
  }

  private async parseHtmlContent(prompt:string, combinedHtml: string): Promise<any> {
    try {
      const response = await this.openai.beta.chat.completions.parse({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: this.prompt },
          { role: 'user', content: `human: ${prompt} \n\n input:(${combinedHtml})` },
        ],
        temperature: 0.3,
        response_format: zodResponseFormat(BotActionsSchema, 'bot_action'),
      });
      return BotActionsSchema.parse(JSON.parse(response.choices[0].message.content || "")).bot_actions;
    } catch (error) {
      console.error('Error parsing HTML content:', error);
      return null;
    }
  }

  public async exec(prompt: string, directory: string = '/Users/paulochade/Documents/projects/kanja/dev/main/crawler/flash/src/modules/parser/files'): Promise<any> {
    const combinedHtml = await this.readHtmlFiles(directory);
    return await this.parseHtmlContent(prompt, combinedHtml);
  }
}