import request from 'supertest'
import { app } from '../../src/app'

describe('Ping endpoints', () => {
    it('should return pong', async () => {
        // ARRANGE
        // ACT
        const response = await request(app)
            .get('/ping')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        // ASSERT
        expect(response.body.message).toBe('pong')
        expect(response.body.random).toBeDefined()
    })
})

