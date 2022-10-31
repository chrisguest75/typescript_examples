
let baseObject = {'a': 1, 'b': 2, 'c': 3}

const mergeObject = {'c': 1, 'd': 2, 'e': 3}

newObject = {
    ...baseObject,
    ...mergeObject
} 

newObject
