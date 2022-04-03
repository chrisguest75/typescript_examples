
function example_success() {
    const promise = new Promise((resolve, reject) => {
        return resolve(27);
      })

    console.log(promise);
    promise.then(number => console.log(number)); // 27
}

function example_failure() {
    const promise = new Promise((resolve, reject) => {
        // Note: only 1 param allowed
        return reject('💩💩💩')
      })    

    console.log(promise);
    promise.catch(err => console.log(err)); // 💩💩💩 
}

async function example() {
  const jeffBuysCake = (cakeType: String) => {
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

async function example_fs_promise() {
}

async function main() {
    console.log('Promises')

    example_success();
    example_failure();
    example();

}

main()