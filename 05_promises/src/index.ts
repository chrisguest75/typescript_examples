
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

async function main() {
    console.log('Promises Examples')

    example_success();
    example_failure();
    example();

    const retuned_promise = example_return_promise();

    const waited = await retuned_promise;
    console.log(waited);

}

main().then(() => console.log('Done')).catch(err => console.log(err));