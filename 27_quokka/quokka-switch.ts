



const test: string = 'error';
switch (test) {
    case 'value2':
    case 'value':
        console.log(test);
        break;
    case 'hello':
        console.log(test);
        break;
    case 'value2':
    case 'world':
        console.log(test);
    break;
    case 'error':
        throw Error('error');
    break;

    default:
        console.log(test);
        break;
}

