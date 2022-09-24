import request from 'supertest'
import { app } from '../../src/app'

describe('Invalid endpoints', () => {
    it('should return 404 and json', async () => {
        // ARRANGE
        // ACT
        const response = await request(app)
            .get('/doesnotexist')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
        // ASSERT
        expect(response.body.message).toBe('Route not found')
    })
})

