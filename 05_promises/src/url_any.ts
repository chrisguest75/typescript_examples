import axios from 'axios';

type Responses = {
    url1: string;
    response1: string;
    length1: number;
    timeTaken1: number;

    url2: string;
    response2: string;
    length2: number;
    timeTaken2: number;
}

function getAxiosInstance() {
    const instance = axios.create()

    instance.interceptors.request.use((config) => {
        config.headers['request-startTime'] = process.hrtime()
        return config
    })
    
    instance.interceptors.response.use((response) => {
        const start = response.config.headers['request-startTime']
        const end = process.hrtime(start)
        const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1000000))
        response.headers['request-duration'] = milliseconds
        return response
    })

    return instance;
}

export async function waitBothURLs(url1: string, url2: string): Promise<Responses> {
    const promise1 = getAxiosInstance().get(url1);
    const promise2 = getAxiosInstance().get(url2);

    console.log(`Url: ${url1}`);
    console.log(`Url: ${url2}`);
    const out = await Promise.all([promise1, promise2]);

    const data1 = out[0].data.toString();
    const data2 = out[1].data.toString();

    return { 
        url1: url1, 
        response1: data1.substring(0, 100),
        length1: data1.length,
        timeTaken1: out[0].headers['request-duration'],

        url2: url2, 
        response2: data2.substring(0, 100),
        length2: data2.length,
        timeTaken2: out[1].headers['request-duration'],
         } as Responses;
}

// REQUIRES ES2020
/*
export async function waitAnyURLs(url1: string, url2: string): Promise<Responses> {
    const promise1 = getAxiosInstance().get(url1);
    const promise2 = getAxiosInstance().get(url2);

    console.log(`Url: ${url1}`);
    console.log(`Url: ${url2}`);
    const out = await Promise.allSettled([promise1, promise2]);

    const data1 = out[0].data.toString();
    const data2 = out[1].data.toString();

    return { 
        url1: url1, 
        response1: data1.substring(0, 100),
        length1: data1.length,
        timeTaken1: out[0].headers['request-duration'],

        url2: url2, 
        response2: data2.substring(0, 100),
        length2: data2.length,
        timeTaken2: out[1].headers['request-duration'],
         } as Responses;
}
*/