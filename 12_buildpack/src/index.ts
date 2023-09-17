import os from 'os';
import process from 'process';

function main() 
{
    // var a = 0
    console.log('Hello world!')
    console.log(os.platform())
    console.log(os.release())
    const [major, minor, patch] = process.versions.node.split('.').map(Number)
    console.log(`Node version: v${major}.${minor}.${patch}`)

    console.log(process.versions)

}

main()