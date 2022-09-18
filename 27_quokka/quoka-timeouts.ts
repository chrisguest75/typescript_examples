async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const myArray = [1, 2, 3, 4, 5];
let current = 0;

const timeoutFrequency = 5000
let watcherTimer = setTimeout(function watcher() {
    const value = myArray[current];
    console.log({ state: 'watcher', value });
    current++
    watcherTimer = setTimeout(watcher, timeoutFrequency)
}, timeoutFrequency)


