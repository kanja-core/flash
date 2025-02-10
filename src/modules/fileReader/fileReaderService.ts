import * as fs from 'fs/promises';
import * as path from 'path';

export async function fileReaderService(
  filePath = '/tmp/file.pdf',
): Promise<Buffer> {
  try {
    if (!filePath || !path.isAbsolute(filePath)) {
      throw new Error(
        'Invalid file path. Please provide an absolute file path.',
      );
    }

    const fileContent = await fs.readFile(filePath);
    return fileContent;
  } catch (error) {
    throw new Error(`Failed to read file: ${error}`);
  }
}
