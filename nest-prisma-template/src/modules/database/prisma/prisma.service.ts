import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoggerService } from 'src/modules/logger/logger.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private logger: LoggerService) {
    super({
      log: ['query', 'warn', 'error'],
    });
    this.logger.setContext(PrismaService.name);
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    this.logger.log('Disconnect');
  }
}
