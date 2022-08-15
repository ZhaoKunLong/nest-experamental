import { Controller, Get, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller('see')
export class SeeController {
  @Get()
  helloSee() {
    return 'hello see event';
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000 * 10).pipe(map(() => ({ data: { hello: 'world' } })));
  }
}
