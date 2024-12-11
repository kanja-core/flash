// https://github.com/luminati-io/sbr-examples/blob/main/nodejs/playwright-file-download/scrape.js
import {CDPSession, Page} from 'playwright-core';
import * as fs from 'fs/promises';

export async function download(
  page: Page,
  client: CDPSession,
  selector: string,
  savePath: string,
): Promise<void> {
  console.log('Downloading file...');
  await page.waitForSelector(selector);

  console.log('Clicking on download button...');
  const requestId = await initiateDownload(page, client, selector);

  console.log(`Download started! Stream it to ${savePath}...`);
  const {stream} = await client.send('Fetch.takeResponseBodyAsStream', {
    requestId,
  });

  const file = await fs.open(savePath, 'w');

  await writeDownload(client, file, stream);
}

async function writeDownload(
  client: CDPSession,
  file: fs.FileHandle,
  stream: string,
) {
  let fileSize = 0;
  let eof = false;
  while (!eof) {
    const {
      data,
      base64Encoded,
      eof: responseEof,
    } = await client.send('IO.read', {
      handle: stream,
    });
    const chunk = Buffer.from(data, base64Encoded ? 'base64' : 'utf8');
    await file.write(chunk);
    fileSize += chunk.byteLength;

    eof = responseEof;
  }
  await file.close();
  console.log(`Download saved! Size: ${fileSize}.`);
}

async function initiateDownload(
  page: Page,
  client: CDPSession,
  selector: string,
): Promise<string> {
  await client.send('Fetch.enable', {
    patterns: [
      {
        requestStage: 'Response',
        resourceType: 'Document',
      },
    ],
  });
  return await new Promise((resolve, reject) => {
    client.on('Fetch.requestPaused', ({requestId}) => {
      resolve(requestId);
    });
    page.click(selector).catch(error => {
      reject(error);
    });
  });
}
