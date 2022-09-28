import request from 'supertest'
import { app } from '../../src/app'

describe('Buckets endpoint', () => {
    it('should return list of buckets', async () => {
        // ARRANGE
        // ACT
        const response = await request(app)
            .get('/buckets/list')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        // ASSERT
        expect(response.body.message).toBe('pong')
        expect(response.body.random).toBeDefined()
    })

    /*it('should error for a bucket that does not exist', async () => {
        // ARRANGE
        const name = 'doesnotexist'
        const path = 'test'

        // ACT
        const response = await request(app)
            .get(`/buckets/watch/${name}/${path}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        // ASSERT
        expect(response.body.name).toBe(name)
        expect(response.body.path).toBe(path)
    })*/

    it('should watch a folder', async () => {
        // ARRANGE
        const name = process.env.BUCKETNAME
        const path = process.env.BUCKETPATH

        // ACT
        const response = await request(app)
            .get(`/buckets/watch/${name}/${path}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        // ASSERT
        expect(response.body.name).toBe(name)
        expect(response.body.path).toBe(path)
    })
})
