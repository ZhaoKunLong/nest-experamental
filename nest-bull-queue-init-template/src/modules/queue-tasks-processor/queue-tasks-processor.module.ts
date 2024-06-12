import { Module } from '@nestjs/common';
import { EmailDelayProcessor } from './email-delay.processor';

@Module({
  imports: [],
  providers: [EmailDelayProcessor],
})
export class QueueTasksProcessorModule {}
