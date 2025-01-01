import { time } from "console";

export function* poissonArrivalGenerator(baseTime: Date, rate: number, timePeriod: number): Generator<Date, void, unknown> {
    if (rate <= 0) {
        throw new Error("Rate must be a positive number.");
    }

    let currentTime = baseTime.getTime(); // Get the base time in milliseconds

    while (true) {
        // Generate a random exponential inter-arrival time
        const interArrivalTime = -Math.log(1.0 - Math.random()) / rate;
        currentTime += interArrivalTime * 1000 * timePeriod; // Convert to milliseconds
        yield new Date(currentTime); // Yield the next arrival time as a Date
    }
}

