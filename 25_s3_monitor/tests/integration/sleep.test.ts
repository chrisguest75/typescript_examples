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

    it('random should be different each call', async () => {
        // ARRANGE
        // ACT
        const response1 = await request(app)
            .get('/sleep')
            .query({ wait: 100 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        const response2 = await request(app)
            .get('/sleep')
            .query({ wait: 100 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        // ASSERT
        expect(response1.body.message).toBe('pong')
        expect(response1.body.random).toBeDefined()
        expect(response2.body.message).toBe('pong')
        expect(response2.body.random).toBeDefined()
        expect(response1.body.random).not.toBe(response2.body.random)
    })
})
