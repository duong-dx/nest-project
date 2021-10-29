import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { WsGuard } from './guards/validation';
import { MessagesInterface } from './interfaces/messages.interface';

@UseGuards(WsGuard)
@WebSocketGateway(3006, { cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MessageGateway');

  afterInit(server: any): any {
    this.logger.log(server, 'Init');
  }

  handleConnection(client: any, ...args: any[]): any {
    this.logger.log(args, client.id, 'Connected..............................');
    client.on('room', (room) => {
      client.join(room);
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(client.id, 'Disconnect');
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('messages')
  async messages(client: Socket, payload: MessagesInterface) {
    console.log(payload);
    this.server
      .to('room1')
      .emit('message-received', { message: payload.message });
  }
}
