import { PubSub } from '../src/publisher'

type events = {
    CreatedPerson: { id: string; name: string; reason: string }
    DeletedPerson: { personId: string; reason: string }
}

test('Subscribe before publish', () => {
    // ARRANGE
    const createdHandler = jest.fn()
    createdHandler.mockImplementation(() => false)

    const pubSub = PubSub<events>()
    pubSub.publish('CreatedPerson', { id: '1', name: 'cory', reason: '' })

    // ACT
    pubSub.subscribe('CreatedPerson', createdHandler)

    // ASSERT
    expect(createdHandler).toHaveBeenCalledTimes(0)
})

test('Create publishes to a single subscriber', () => {
    // ARRANGE
    const createdHandler = jest.fn()
    createdHandler.mockImplementation(() => false)

    const pubSub = PubSub<events>()
    pubSub.subscribe('CreatedPerson', createdHandler)

    // ACT
    pubSub.publish('CreatedPerson', { id: '1', name: 'cory', reason: '' })

    // ASSERT
    expect(createdHandler).toHaveBeenCalledWith({ id: '1', name: 'cory', reason: '' })
})

test('Create publishes to a multiple subscribers', () => {
    // ARRANGE
    const createdHandler1 = jest.fn()
    createdHandler1.mockImplementation(() => false)
    const createdHandler2 = jest.fn()
    createdHandler2.mockImplementation(() => false)

    const pubSub = PubSub<events>()
    pubSub.subscribe('CreatedPerson', createdHandler1)
    pubSub.subscribe('CreatedPerson', createdHandler2)

    // ACT
    pubSub.publish('CreatedPerson', { id: '1', name: 'cory', reason: '' })

    // ASSERT
    expect(createdHandler1).toHaveBeenCalledWith({ id: '1', name: 'cory', reason: '' })
    expect(createdHandler2).toHaveBeenCalledWith({ id: '1', name: 'cory', reason: '' })
})

// test('Delete publishes to single subscriber', () => {
//     // ARRANGE
//     const createdHandler = jest.fn()
//     createdHandler.mockImplementation(() => false)

//     const pubSub = PubSub<events>()
//     pubSub.subscribe('DeletedPerson', createdHandler)
//     pubSub.publish('CreatedPerson', { id: '1', name: 'cory', reason: '' })

//     // ACT
//     pubSub.publish('DeletedPerson', { id: '1', reason: '' })

//     // ASSERT
//     expect(createdHandler).toHaveBeenCalledWith({ id: '1', name: 'cory', reason: '' })
// })
