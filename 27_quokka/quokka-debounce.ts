
// example using lodash debounce
import { debounce, throttle } from 'lodash';

const debounced = debounce(() => console.log('debounced'), 1000);
const throttled = throttle(() => console.log('throttled'), 1000);

debounced();
debounced();
debounced();

throttled();
throttled();
throttled();

// https://gist.github.com/ICEDLEE337/a29a2c4233c92e529b0623cad4310e93
(() => {

	// in this example we invoke a fn for a period of 10 sec, invoking it 10 times a second, but we can perceive that the original function is only invoked at most once per second according to the parameter below
 
	var TOTAL_TIME_TO_RUN = 10000; // 10 sec
	var THROTTLE_INTERVAL = 2000; // <= adjust this number to see throttling in action
	var INVOCATION_INTERVAL = 100; // 0.1 sec

	// regular fn
    var punchClock = function punchClock () {
        console.log(new Date().toISOString());
    };

	// wrap it and supply interval representing minimum delay between invocations
	var throttledPunchClock = throttle(punchClock, THROTTLE_INTERVAL);

	// set up looping
	var intervalId = setInterval(throttledPunchClock, INVOCATION_INTERVAL);

	// run the demo
	setTimeout(()=>clearInterval(intervalId), TOTAL_TIME_TO_RUN)

})();