import { IncomingMessage, UdpGateway } from 'nest-udp-adapter';
import { Socket } from 'dgram';
import { from, map } from 'rxjs';
import { WebSocketServer } from '@nestjs/websockets';

@UdpGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Socket;

  constructor() {
    console.log('EventsGateway created');
    setTimeout(() => {
      this.server.send('go', 5000, '192.168.1.254', (res) => {
        console.log('res', res);
      });
    }, 1000);
  }

  @IncomingMessage()
  handleMessage(socket: Socket, data: any) {
    console.log('Received:', data.toString());
    // socket.send('go', 5000, '192.168.1.254');
    // const response = [1, 2, 3];

    // return from(response).pipe(
    //   map(data => data.toString()),
    // );
    return 'action:Hello world!';
  }
}
