import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { fromEvent, Observable } from 'rxjs';
import { SSE_DATA } from './data';

@Injectable()
export class SseService {
  private readonly emitter: EventEmitter;
  constructor() {
    this.emitter = new EventEmitter();
  }

  subscribe(channel: string): Observable<any> {
    return fromEvent(this.emitter, channel);
  }

  emit(channel: string, data?: object) {
    console.log(channel, data);
    this.emitter.emit(channel, {
      data: { ...data, reminder: SSE_DATA[channel] },
      type: 'notice',
    });
  }
}
