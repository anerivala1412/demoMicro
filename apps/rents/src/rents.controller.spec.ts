import { Test, TestingModule } from '@nestjs/testing';
import { RentsController } from './rents.controller';
import { RentsService } from './rents.service';

describe('RentsController', () => {
  let rentsController: RentsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RentsController],
      providers: [RentsService],
    }).compile();

    rentsController = app.get<RentsController>(RentsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rentsController.getHello()).toBe('Hello World!');
    });
  });
});
