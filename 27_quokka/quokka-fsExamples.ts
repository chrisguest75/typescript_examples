// Use async promise fs methods
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const {mkdir, writeFile, readFile, appendFile } = fs.promises;

async function test() {
  const outPath = './out';
  const guid = uuidv4();
  
  const newPath = path.join(outPath, guid);
  
  console.log(newPath)
  
  if (!fs.existsSync(newPath)) {
      await mkdir(newPath, { recursive: true });
  }

  const filePath = path.join(newPath, 'test.txt');
  
  await writeFile(filePath, "test");
  const fileData = await readFile(filePath, 'utf-8');
  console.log(fileData);
}

test();

