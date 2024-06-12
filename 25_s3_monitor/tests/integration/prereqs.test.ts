describe('Prerequisites', () => {
    it('should be the correct profile', async () => {
        // ARRANGE
        // ACT
        // ASSERT
        expect(process.env.AWS_PROFILE).toBeDefined()
        expect(process.env.BUCKETNAME).toBeDefined()
        expect(process.env.BUCKETPATH).toBeDefined()
    })
})
