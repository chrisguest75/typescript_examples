import { createClient } from 'redis';

(async () => {
  const client = createClient(
    {
      url: 'redis://0.0.0.0:6379'
    }
  );

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  await client.set('key', 'myvalue');
  const value = await client.get('key');
  console.log(`${value}`)
})();


/*export function main(): number {
  // var a = 0
  console.log('Hello world!!!!')
  return 0
}

main()
*/