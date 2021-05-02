const one = new Promise<string>((resolve, reject) => {
    //resolve("hello");
    reject(new Error("error"));
});
one.then(value => {
    console.log('resolved', value);
});
one.catch(error => {
    console.log('rejected', error);
});

await one;

