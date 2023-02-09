// example using lodash debounce
import omit from 'lodash';

const object = { 'a': 1, 'b': '2', 'c': 3 };
console.log(object);
console.log(omit.omit(object, ['a', 'c']));

