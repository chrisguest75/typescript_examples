import request from 'supertest'
import { app } from '../../src/app'

describe('Root endpoint', () => {
    it('should return html', async () => {
        // ARRANGE
        // ACT
        const response = await request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /html/)
            .expect(200)
        // ASSERT
        //expect(response.body.message).toBe('pong')
        //expect(response.body.random).toBeDefined()
    })
})
