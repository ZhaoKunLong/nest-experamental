import { Test, TestingModule } from '@nestjs/testing';
import { SeeController } from './see.controller';

describe('SeeController', () => {
  let controller: SeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeeController],
    }).compile();

    controller = module.get<SeeController>(SeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
