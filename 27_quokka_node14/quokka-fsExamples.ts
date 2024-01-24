// Use async promise fs methods
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const {mkdir, writeFile, readFile, appendFile } = fs.promises;

async function simpleReadWrite() {
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

async function writeArray(outPath: string, fileName: string) {
  console.log(outPath)
  
  if (!fs.existsSync(outPath)) {
      await mkdir(outPath, { recursive: true });
  }
  const filePath = path.join(outPath, fileName);

  // create an array of lines 
  const lines = ['line 1', 'line 2', 'line 3'];
    
  await writeFile(filePath, lines.map((line) => { return `prefix ${line} postfix`}).join('\n'));

  return filePath;
}

async function appendToFile(filePath: string, lines: string[]) {
  await appendFile(filePath, lines.map((line) => { return `prefix ${line} postfix`}).join('\n'));
}

async function appendToFileIfMissing(filePath: string, lastLine:string) {
  const playlistText = await readFile(filePath, 'utf8');
  const inputLines = playlistText.split('\n');

  console.log(inputLines)
  if (inputLines[inputLines.length - 1] === lastLine || ) {
    console.log('last line is the same');
    return;
  }
  await appendFile(filePath, `${lastLine}\n`));
}


async function iterateFolder() {
  const outPath = './out';
  const files = await fs.promises.readdir(outPath);
  for (const file of files) {
    console.log(file);
  }
}


async function iterateFolderRecursive(parentPath: string) {
  const files = await fs.promises
    .readdir(parentPath, { withFileTypes: true });
  for (const file of files) {
    const filePath = path.join(parentPath, file.name);
    if (file.isDirectory()) {
      console.log(`Directory: ${filePath}`);
      await iterateFolderRecursive(filePath );
    } else {
      console.log(`File: ${filePath}`);
    }
  }
}



async function test() {
  //simpleReadWrite()
  //iterateFolderRecursive('./') 
  // const outPath = './out';
  // //const guid = uuidv4();  
  // const guid = '00000000';
  // const newPath = path.join(outPath, guid);

  // const filePath = await writeArray(newPath, 'test.txt');
  // appendToFile(filePath, ['line 4', 'line 5', 'line 6', 'line 7']);



  appendToFileIfMissing('./in/main.m3u8', '#EXT-X-ENDLIST');
}




test();

