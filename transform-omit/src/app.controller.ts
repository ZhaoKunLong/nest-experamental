import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventRespDTO } from './dto/event.resp.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getEvent():Promise<EventRespDTO>  {
    return this.appService.getEvent();
  }
}
