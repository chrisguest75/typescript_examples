import fs from 'fs';
import { waitBothURLs } from './url_any';

function sleep(ms: number): Promise<string> {
  return new Promise((resolve) => {
      // logger.info(`Sleep for ${ms}`);
      setTimeout(() => {
          resolve('Sleep complete')
      }, ms)
  })
}

function example_success() {
    const promise = new Promise((resolve, reject) => {
        return resolve(27);
      })

    console.log(promise);
    promise.then(number => console.log(`example_success: ${number}`)); // 27
}

function example_failure() {
    const promise = new Promise((resolve, reject) => {
        // Note: only 1 param allowed
        return reject('💩💩💩')
      })    

    console.log(promise);
    promise.catch(err => console.log(`example_failure: ${err}`)); // 💩💩💩 
}

async function example() {
  const jeffBuysCake = (cakeType: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        if (cakeType === 'black forest') {
          resolve('black forest cake!')
        } else {
          reject('No cake 😢')
        }
      }, 1000)
    })
  }
  const promise = jeffBuysCake('black forest');
  await promise; 
  console.log(promise);
}

function example_return_promise() {
  const promise = new Promise((resolve, reject) => {
      sleep(1000).then(() => {
        const d = Date.now();
        console.log(`d = ${d}`);
        d % 2 === 0 ? reject('💩💩💩') : resolve("🎉🎉🎉");
      })
    })

  console.log(promise);

  return promise;
}

type FileRecord = {
  filePath: string;
  contents: string;
  stats: fs.Stats;
}

async function load_a_file(filePath: string): Promise<FileRecord> {
  try {
    const stats = fs.promises.stat(filePath);
    const data = fs.promises.readFile(filePath, 'utf-8');
    
    const out = await Promise.all([stats, data]);
    
    return { filePath: filePath, contents: out[1], stats: out[0] } as FileRecord;
  } catch (error) {
    throw new Error(`Failed to load file: ${error}`);
  }
}



async function main() {
    console.log('Promises Examples')
    console.log('********************')
    example_success();
    example_failure();
    example();
    const filePath = './.nvmrc';
    const filedata = await load_a_file(filePath);
    console.log(`filePath: '${filedata.filePath}'`);
    console.log(`contents: '${filedata.contents}'`);
    console.log(`stats: '${JSON.stringify(filedata.stats)}'`);

    const retuned_promise = example_return_promise();

    const waited = await retuned_promise;
    console.log(waited);


    // TESTS:
    // 1. Both URLs are slow
    // 2. One URL is slow
    // 3. Url is invalid
    // 4. first one to respond 

    /*
    for (let index = 0; index < 10; index++) {
      const response = await waitBothURLs('http://www.google.com', 'http://www.bing.com');
      console.log(response);
      
    }
  */

    for (let index = 0; index < 1; index++) {
      const response = await waitBothURLs('https://httpbin.org/delay/2', 'https://httpbin.org/delay/5');
      console.log(response);
      
    }

}

main().then(() => console.log('Done')).catch(err => console.log(err));