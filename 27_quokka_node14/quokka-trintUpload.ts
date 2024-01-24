import axios from 'axios';
import * as fs from 'fs'
import fetch from 'node-fetch';

const {mkdir, readFile } = fs.promises;

const token = process.env.TRINT_TOKEN || '';
const apikey = process.env.API_KEY || '';

const BASE_URL='https://upload.trint.com/'

// post a binary file to the server
// curl -X POST "${TRINT_UPLOADURL}?filename=${TITLE}" --header "authorization: Bearer ${TOKEN}" -H 'content-type: video/mp4' --data-binary @${FILENAME}

async function uploadApiKey(file: string, title: string, apikey: string) {
    const data = await readFile(file)
    console.log(data.length)

    const response = await axios({
        method: 'POST',
        url: `${BASE_URL}?filename=${title}`,
        data: Buffer.from(data),
        headers: { 'content-type': 'video/mp4', 'api-key': `${apikey}` }
    });

    return response.data;
}

async function uploadToken(file: string, title: string, token: string) {
    const data = await readFile(file)
    console.log(data.length)

    const response = await axios({
        method: 'POST',
        url: `${BASE_URL}?filename=${title}`,
        data: Buffer.from(data),
        headers: { 'content-type': 'video/mp4', 'authorization': `Bearer ${token}`, 'content-length': data.length }
    });

    return response.data;
}

async function nodefetchUploadWithToken(
    file: string,
    title: string,
    token: string,
  ) {
    const data = await readFile(file);
    console.log('Data file read from disk', { length: data.length });
  
    const response = await fetch(`${BASE_URL}?filename=${title}`, {
      method: 'POST',
      body: Buffer.from(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'video/mp4',
        'Content-Length': `${data.length}`,
      },
    });
  
    return response;
  }


async function tests() {
    console.log(token)
    console.log(apikey)
    //const outcome = await uploadApiKey('./in/audio.m4a', 'testApiKey', apikey)
    //const outcome = await uploadToken('./in/audio.m4a', 'testToken', token)
    const outcome = await nodefetchUploadWithToken('./in/audio.m4a', 'testToken', token)
    console.log(outcome)
}

tests()
