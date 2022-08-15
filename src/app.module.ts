import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeeModule } from './see/see.module';

@Module({
  imports: [SeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
