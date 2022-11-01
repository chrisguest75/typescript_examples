import { promisify } from 'util';

const sleep = promisify(setTimeout);

/*async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}*/

sleep(10000).then(() => console.log('Woken from sleep!'));

const myArray = [1, 2, 3, 4, 5];
let current = 0;

const timeoutFrequency = 5000
let watcherTimer = setTimeout(function watcher() {
  if (current < myArray.length) {
    const value = myArray[current];
    console.log({ state: 'watcher', value });
    current++
    watcherTimer = setTimeout(watcher, timeoutFrequency);
  } else {
    console.log({ state: 'watcher', value: 'done' });
  } 
}, timeoutFrequency)
