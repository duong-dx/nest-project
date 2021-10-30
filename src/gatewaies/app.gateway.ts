import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger, UseGuards, Request } from '@nestjs/common';
import { WsGuard } from './guards/validation';
import { MessagesInterface } from './interfaces/messages.interface';
import { UsersService } from "../models/users/users.service";
import { JwtService } from "@nestjs/jwt";

@UseGuards(WsGuard)
@WebSocketGateway(3006, { cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MessageGateway');
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  afterInit(server: any): any {
    this.logger.log(server, 'Init');
  }

  async handleConnection(client: Socket) {
    this.logger.log(client.id, 'Connected..............................');
    const user = await this.getDataUserFromToken(client);

    console.log(user, 3232323232);
    // need handle insert socketId to information table
    client.on('room', (room) => {
      client.join(room);
    });
  }

  async handleDisconnect(client: Socket) {
    const user = await this.getDataUserFromToken(client);

    console.log(user, 999999);
    // need handle remove socketId to information table
    this.logger.log(client.id, 'Disconnect');
  }

  @SubscribeMessage('messages')
  async messages(client: Socket, payload: MessagesInterface) {
    console.log(payload);
    this.server
      .to('Zd7yd3vJaDNiwDFVAAAD')
      .emit('message-received', { message: payload.message });
  }

  async getDataUserFromToken(client: Socket) {
    const authToken: any = client.handshake?.query?.token;
    try {
      const decoded = this.jwtService.verify(authToken);

      return await this.userService.getUserByEmail(decoded.email); // response to function
    } catch (ex) {
      console.log('token invalid');
      return false;
    }
  }
}
