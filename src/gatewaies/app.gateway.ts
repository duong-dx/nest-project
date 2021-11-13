import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HttpException, HttpStatus, Logger, UseGuards } from '@nestjs/common';
import { WsGuard } from './guards/validation';
import { MessagesInterface } from './interfaces/messages.interface';
import { UsersService } from '../models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InformationService } from '../models/information/information.service';
import { TypeInformation } from '../models/information/interfaces/information.interface';
import { SaveInformationDto } from '../models/information/dto/save.dto';
import { UserEntity } from '../models/users/serializers/user.serializer';
import { ConversationsService } from '../models/conversations/conversations.service';
import { MessagesService } from '../models/messages/messages.service';
import { UserConversationService } from '../models/user_conversation/user-conversation.service';

@UseGuards(WsGuard)
@WebSocketGateway(3006, { cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MessageGateway');
  constructor(
    private userService: UsersService,
    private conversationService: ConversationsService,
    private informationService: InformationService,
    private messageService: MessagesService,
    private userConversationService: UserConversationService,
    private jwtService: JwtService,
  ) {}

  afterInit(server: any): any {
    this.logger.log(server, 'Init');
  }

  async handleConnection(client: Socket) {
    this.logger.log(client.id, 'Connected..............................');
    const user: UserEntity = await this.getDataUserFromToken(client);

    const information: SaveInformationDto = {
      user_id: user.id,
      type: TypeInformation.socket_id,
      status: false,
      value: client.id,
    };

    await this.informationService.create(information);
    // need handle insert socketId to information table
    // client.on('room', (room) => {
    //   client.join(room);
    // });
  }

  async handleDisconnect(client: Socket) {
    const user = await this.getDataUserFromToken(client);
    await this.informationService.deleteByValue(user.id, client.id);

    // need handle remove socketId to information table
    this.logger.log(client.id, 'Disconnect');
  }

  @SubscribeMessage('messages')
  async messages(client: Socket, payload: MessagesInterface) {
    const conversation = await this.conversationService.findById(
      payload.conversation_id,
      ['users'],
    );

    const userId = [];
    conversation.users.map((user) => {
      userId.push(user.id);

      return user;
    });

    const dataSocketId = await this.informationService.findSocketId(userId);

    const message = await this.messageService.create({
      user_id: payload.user_id,
      status: false,
      message: payload.message,
      conversation_id: payload.conversation_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const dataUserConversation =
      await this.userConversationService.findDataUserConversation(
        message.user_id,
        message.conversation_id,
      );

    const messageId =
      typeof message.id === 'string' ? parseInt(message.id) : message.id;

    await this.userConversationService.updateLastMessageId(
      dataUserConversation,
      messageId,
    );

    const emit = this.server;
    dataSocketId.map((value) => {
      emit.to(value.value).emit('message-received', {
        id: message.id,
        message: message.message,
        conversation_id: message.conversation_id,
        user_id: message.user_id,
        status: message.status,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      });
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

  async getDataUserFromToken(client: Socket): Promise<UserEntity> {
    const authToken: any = client.handshake?.query?.token;
    try {
      const decoded = this.jwtService.verify(authToken);

      return await this.userService.getUserByEmail(decoded.email); // response to function
    } catch (ex) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
