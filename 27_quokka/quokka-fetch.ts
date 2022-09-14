import * as axios from 'axios';

async function fetchUrl(url: string) {
    return new Promise((resolve, reject) => {
      axios.default
        .get(url)
        .then((resp) => {
          resolve(resp);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

fetchUrl("https://www.google.com").then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
});

/*fetchUrl("http://not.google.com").then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
});*/

