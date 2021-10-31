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
    this.server.to(payload.room).emit('message-received', {
      message: payload.message,
      room: payload.room,
    });

    //https://stackoverflow.com/questions/35680565/sending-message-to-specific-client-in-socket-io
    // // sending to sender-client only
    // socket.emit('message', "this is a test");
    //
    // // sending to all clients, include sender
    // io.emit('message', "this is a test");
    //
    // // sending to all clients except sender
    // socket.broadcast.emit('message', "this is a test");
    //
    // // sending to all clients in 'game' room(channel) except sender
    // socket.broadcast.to('game').emit('message', 'nice game');
    //
    // // sending to all clients in 'game' room(channel), include sender
    // io.in('game').emit('message', 'cool game');
    //
    // // sending to sender client, only if they are in 'game' room(channel)
    // socket.to('game').emit('message', 'enjoy the game');
    //
    // // sending to all clients in namespace 'myNamespace', include sender
    // io.of('myNamespace').emit('message', 'gg');
    //
    // // sending to individual socketid
    // socket.broadcast.to(socketid).emit('message', 'for your eyes only');

    //https://stackoverflow.com/questions/50602359/how-to-send-multiple-client-using-socket-id-that-are-connected-to-socket-nodejs
    // Add socket to room
    // socket.join('some room');
    //
    // // Remove socket from room
    //     socket.leave('some room');
    //
    // // Send to current client
    //     socket.emit('message', 'this is a test');
    //
    // // Send to all clients include sender
    //     io.sockets.emit('message', 'this is a test');
    //
    // // Send to all clients except sender
    //     socket.broadcast.emit('message', 'this is a test');
    //
    // // Send to all clients in 'game' room(channel) except sender
    //     socket.broadcast.to('game').emit('message', 'this is a test');
    //
    // // Send to all clients in 'game' room(channel) include sender
    //     io.sockets.in('game').emit('message', 'this is a test');
    //
    // // Send to individual socket id
    //     io.sockets.socket(socketId).emit('message', 'this is a test');
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
