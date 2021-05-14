
function success() {
    const promise = new Promise((resolve, reject) => {
        return resolve(27);
      })

    console.log(promise);
    promise.then(number => console.log(number)); // 27
}

function failure() {
    const promise = new Promise((resolve, reject) => {
        // Note: only 1 param allowed
        return reject('💩💩💩')
      })    

    console.log(promise);
    promise.catch(err => console.log(err)); // 💩💩💩 
}

function main() {
    console.log('Promises')

    success();
    failure();

    const jeffBuysCake = cakeType => {
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
    const promise = jeffBuysCake('black forest')
    console.log(promise)
}

main()