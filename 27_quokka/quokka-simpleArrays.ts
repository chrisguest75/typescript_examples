const values = ['ready', 'started', 'live']
const looking = 'ready'

console.log(values.includes(looking))


enum Paths {
    Ready = 'ready',
    Started = 'started',
    Live = 'live'
}

// requires tsconfig configuration
// Object.values(Paths).includes(looking)

(<any>Object).values(Paths).includes(looking)


