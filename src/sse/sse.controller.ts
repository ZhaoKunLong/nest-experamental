import { Controller, Get, Param, Query, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';
import { SseService } from './sse.service';

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller('sse')
export class SseController {
  constructor(private sseService: SseService) {}

  @Get('add-event/:id')
  helloSse(@Param('id') id: string) {
    this.sseService.emit(id, {
      hello: `this is added by get and from sse reply for ${id}`,
    });

    return 'hello sse!';
  }

  // @Event(EventEmitterType.BREED_PUBLISHED)
  @Sse('sse')
  sse(@Query() { userId }: { userId: string }): Observable<MessageEvent> {
    return this.sseService.subscribe(userId);
    // return interval(1000 * 10).pipe(
    //   map((): MessageEvent => ({ data: { hello: 'world' }, type: 'notice' })),
    // );
  }
}
