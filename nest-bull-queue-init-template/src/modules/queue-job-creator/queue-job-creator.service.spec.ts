import { Test, TestingModule } from '@nestjs/testing';
import { QueueJobCreatorService } from './queue-job-creator.service';

describe('QueueJobCreatorService', () => {
  let service: QueueJobCreatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueJobCreatorService],
    }).compile();

    service = module.get<QueueJobCreatorService>(QueueJobCreatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
