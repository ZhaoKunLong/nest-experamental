import { Test, TestingModule } from '@nestjs/testing';
import { QueueJobCreatorController } from './queue-job-creator.controller';

describe('QueueJobCreatorController', () => {
  let controller: QueueJobCreatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueJobCreatorController],
    }).compile();

    controller = module.get<QueueJobCreatorController>(
      QueueJobCreatorController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
