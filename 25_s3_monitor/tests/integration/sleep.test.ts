import request from 'supertest'
import { app } from '../../src/app'
import { performance } from 'perf_hooks'

describe('Sleep endpoints', () => {
    it('should sleep default 500', async () => {
        // ARRANGE
        const startTime = performance.now()
        // ACT
        const response = await request(app)
            .get('/sleep')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        // ASSERT
        expect(performance.now() - startTime).toBeGreaterThan(500)
        expect(response.body.message).toBe('pong')
        expect(response.body.random).toBeDefined()
    })

    it('should sleep for passed in value', async () => {
        // ARRANGE
        const startTime = performance.now()
        // ACT
        const response = await request(app)
            .get('/sleep')
            .query({ wait: 2000 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        // ASSERT
        expect(performance.now() - startTime).toBeGreaterThan(500)
        expect(response.body.message).toBe('pong')
        expect(response.body.random).toBeDefined()
    })
})
