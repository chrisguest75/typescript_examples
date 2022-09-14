import axios, { AxiosResponse } from 'axios';

interface baseResponse {
  error?: string  
}

interface ip extends baseResponse {
  ip: string
}

interface LiveResponse extends baseResponse {
  alive: string; 
}

interface StartedResponse extends baseResponse {
  started: boolean; 
}

interface ReadyResponse extends baseResponse {
  ready: boolean; 
}

async function fetchUrl<T>(url: string, params = {}) {
    return new Promise<AxiosResponse<T, any>>((resolve, reject) => {
      axios
        .get(url, params)
        .then((resp) => {
          resolve(resp);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

 async function test<T>(url: string) {
  const out = fetchUrl<T>(url).then((response) => {
    return response.data
  }).catch((error) => {
    return error
  });
  let value = await out

  return new Promise((resolve, reject) => {
      if (value instanceof Error) {
        resolve({ error: value.message} );
      } else {
        resolve (value)  
      }  
  });
}

async function tests() {
  console.log(await test<ip>("https://2api.ipify.org?format=json"))
  console.log(await test<ip>("https://api.ipify.org?format=json"))
  
  console.log(await test<LiveResponse>("http://0.0.0.0:8080/live"))
  console.log(await test<StartedResponse>("http://0.0.0.0:8080/started"))
  console.log(await test<ReadyResponse>("http://0.0.0.0:8080/ready"))
}

tests()