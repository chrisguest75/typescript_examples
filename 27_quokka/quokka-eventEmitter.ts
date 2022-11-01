import * as events from 'events';


const em = new events.EventEmitter();

// subscribe to the event
em.on('myEvent', function (data: string) {
    console.log('myEvent: ' + data);
});

// Raising myEvent
em.emit('myEvent', 'Hello World');


// A class that raises an event when it see a number divisible by 3
class DivisibleByThree extends events.EventEmitter {
    // Call the super class constructor
    constructor() {
        super();
    }

    // Method to check if a number is divisible by 3
    check(input: number) {
        if (input % 3 === 0) {
            // Raise an event
            this.emit('divisibleByThree', input);
        }
    }
}

// Create an instance of the class
const divisibleByThree = new DivisibleByThree();

// Register a listener
divisibleByThree.on('divisibleByThree', (input: number) => {
    console.log(`${input} is divisible by 3`);
});

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
numbers.map((number) => divisibleByThree.check(number));





