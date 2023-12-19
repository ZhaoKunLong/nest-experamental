import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { LoggerModule } from './modules/logger/logger.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env', // 默认的一些环境变量
        `.env.${process.env.NODE_ENV}`, // 跟随启动环境进行加载 eg. dev 只会加载.dev
        `.env.${process.env.NODE_ENV}.local`,
      ],
      isGlobal: true,
    }),
    LoggerModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
