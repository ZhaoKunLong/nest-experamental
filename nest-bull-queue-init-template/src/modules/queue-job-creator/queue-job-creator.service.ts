import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { EMAIL_DELAY_QUEUE, EMAIL_DELAY_TASKS } from 'constant';

@Injectable()
export class QueueJobCreatorService {
  constructor(
    @InjectQueue(EMAIL_DELAY_TASKS)
    private emailDelayQueue: Queue,
  ) {}

  async createJob(data: Record<string, any>): Promise<void> {
    await this.emailDelayQueue.add(
      EMAIL_DELAY_QUEUE.DELAY_RESUME_EMAIL_30_MINUTES,
      {
        data,
      },
      { delay: 1 * 60 * 1000 },
    );
  }
}
