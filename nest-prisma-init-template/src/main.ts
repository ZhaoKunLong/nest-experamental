import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './modules/logger/logger.service';

async function bootstrap() {
  const logger = new LoggerService('NestApplication');
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger,
  });
  await app.listen(process.env.PORT || 3000);
  logger.log(`Host on ${await app.getUrl()}`);
}
bootstrap();
