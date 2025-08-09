import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

export async function saveJson(filePath: string, data: any) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function loadJson<T>(filePath: string): Promise<T> {
  const content = await readFile(filePath, 'utf-8');
  return JSON.parse(content);
}
