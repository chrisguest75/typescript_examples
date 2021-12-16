import { ErrorController } from '../src/controllers/ErrorController';

describe('ErrorController', () => {
    it('will get error', async () => {
        const controller = new ErrorController();
        const error = await controller.getErrorCode(502)
        expect(error.message).toEqual("Desired status 502");
    })
})

