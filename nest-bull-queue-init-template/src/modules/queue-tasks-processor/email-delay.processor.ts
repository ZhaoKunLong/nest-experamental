import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EMAIL_DELAY_QUEUE, EMAIL_DELAY_TASKS } from 'constant';

@Processor(EMAIL_DELAY_TASKS)
export class EmailDelayProcessor {
  constructor() {}

  @Process(EMAIL_DELAY_QUEUE.DELAY_RESUME_EMAIL_30_MINUTES)
  async handleDelayResumeEmail({ data }: Job): Promise<void> {
    console.log(`execute the job`);
    console.log(data);
  }
}
