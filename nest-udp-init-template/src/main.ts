import { NestFactory } from '@nestjs/core';
import { UdpAdapter } from 'nest-udp-adapter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new UdpAdapter(app, {
    type: 'udp4',
    port: 5000,
  }));
  await app.listen(3000);
}
bootstrap();
