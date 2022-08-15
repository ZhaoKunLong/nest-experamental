import { Module } from '@nestjs/common';
import { SeeController } from './see.controller';

@Module({
  controllers: [SeeController],
})
export class SeeModule {}
