import { Body, Controller, Post } from '@nestjs/common';
import { QueueJobCreatorService } from './queue-job-creator.service';

@Controller('queue-job-creator')
export class QueueJobCreatorController {
  constructor(private queueJobCreatorService: QueueJobCreatorService) {}

  @Post()
  async createJob(@Body() data: Record<string, any>): Promise<void> {
    return this.queueJobCreatorService.createJob(data);
  }
}
