import { PingController } from '../src/controllers/PingController';

describe('PingController', () => {
    it('will get pong', async () => {
        const controller = new PingController();
        const pong = await controller.getMessage()
        expect(pong.message).toEqual("pong");
    })
})