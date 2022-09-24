import request from 'supertest'
import { app } from '../../src/app'

describe('Buckets endpoint', () => {
    it('should return list of buckets', async () => {
        // ARRANGE
        // ACT
        const response = await request(app)
            .get('/buckets')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        // ASSERT
        expect(response.body.message).toBe('pong')
        expect(response.body.random).toBeDefined()
    })
})
