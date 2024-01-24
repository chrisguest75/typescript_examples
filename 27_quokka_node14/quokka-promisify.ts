// Promisify the setTimeout 
import { promisify } from 'util';

const sleep = promisify(setTimeout);

async function test() {
  const sleepTime = 1;
  await sleep(sleepTime * 1000);
  console.log('1');
  await sleep(sleepTime * 1000);
  console.log('2');
  await sleep(sleepTime * 1000);
  console.log('3');
  await sleep(sleepTime * 1000);
  console.log('4');
  await sleep(sleepTime * 1000);
  console.log('5');
}

test()
