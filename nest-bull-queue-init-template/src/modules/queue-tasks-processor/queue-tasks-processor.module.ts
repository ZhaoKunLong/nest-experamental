import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EMAIL_DELAY_TASKS, OTHER_TASKS } from 'constant';
import { EmailDelayProcessor } from './email-delay.processor';

@Module({
  imports: [],
  providers: [EmailDelayProcessor],
})
export class QueueTasksProcessorModule {}
