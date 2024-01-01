import * as readline from 'readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { add } from './add.js'
import { greet } from '@chrisguest75/spellcheck_esm'

export async function main() {
  console.log(`${JSON.stringify(process.versions, null, 2)}`)
  console.log(`${JSON.stringify(process.argv, null, 2)}`)

  console.log('Starting')

  if (process.argv.length == 2) {
    const rl = readline.createInterface({ input, output })
    try {
      const name = await rl.question('Please enter your name: ')
      console.log(`Hello ${greet(name)}`)
      const number1 = await rl.question('Please enter a number: ')
      const number2 = await rl.question('Please enter another number: ')
      console.log(`You entered: ${number1} and ${number2}`)
      const result = add(parseInt(number1), parseInt(number2))
      console.log(`The result is: ${result}`)
    } catch (error) {
      console.error(`An error occurred: ${error}`)
    } finally {
      rl.close()
    }
  } else {
    console.log('Arguments passed indicating skipping user input')
  }

  console.log('Finishing')
}

main()
