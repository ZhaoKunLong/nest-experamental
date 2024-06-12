import { Module } from '@nestjs/common';
import { QueueJobCreatorController } from './queue-job-creator.controller';
import { QueueJobCreatorService } from './queue-job-creator.service';
import { BullModule } from '@nestjs/bull';
import { EMAIL_DELAY_TASKS, OTHER_TASKS } from 'constant';

@Module({
  imports: [
    BullModule.registerQueue(
      { name: EMAIL_DELAY_TASKS },
      { name: OTHER_TASKS },
    ),
  ],
  controllers: [QueueJobCreatorController],
  providers: [QueueJobCreatorService],
  exports: [QueueJobCreatorService],
})
export class QueueJobCreatorModule {}
