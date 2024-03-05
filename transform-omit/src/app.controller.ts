import { Controller, Get, SetMetadata, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { EventRespDTO } from './dto/event.resp.dto';
import { RespSerializerInterceptor } from './resp-serializer/resp-serializer.interceptor';
import { RespSerializeOptions } from './resp-serializer/resp-serializer.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //  将返回转换为class 再转换为plain
  @RespSerializeOptions({ Role: ['admin'], RespClass: EventRespDTO })
  @UseInterceptors(RespSerializerInterceptor)
  @Get()
  async getEvent(): Promise<EventRespDTO> {
    const { event, invites } = await this.appService.getEvent();
    return {
      event,
      invites,
    };
  }
}
