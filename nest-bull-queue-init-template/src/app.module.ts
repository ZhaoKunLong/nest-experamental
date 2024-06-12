import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueTasksProcessorModule } from './modules/queue-tasks-processor/queue-tasks-processor.module';
import { BullModule } from '@nestjs/bull';
import { QueueJobCreatorModule } from './modules/queue-job-creator/queue-job-creator.module';

@Module({
  imports: [
    QueueTasksProcessorModule,
    BullModule.forRoot({
      redis: 'redis://localhost:6379',
      prefix: 'queue-tasks:',
    }),
    QueueJobCreatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
