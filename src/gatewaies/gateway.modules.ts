import { Module } from '@nestjs/common';
import { UsersModule } from '../models/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../models/users/users.repository';
import { UsersService } from '../models/users/users.service';
import { AppGateway } from './app.gateway';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_TIME, JWT_SECRET_KEY } from '../config/constants';
import { InformationModule } from '../models/information/information.module';
import { InformationRepository } from '../models/information/information.repository';
import { ConversationsModule } from '../models/conversations/conversations.module';
import { ConversationsRepository } from '../models/conversations/conversations.repository';
import { MessagesRepository } from '../models/messages/messages.repository';
import { MessagesModule } from '../models/messages/messages.module';

@Module({
  imports: [
    UsersModule,
    InformationModule,
    ConversationsModule,
    MessagesModule,
    TypeOrmModule.forFeature([
      UsersRepository,
      InformationRepository,
      ConversationsRepository,
      MessagesRepository,
    ]),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: EXPIRES_TIME },
    }),
  ],
  providers: [AppGateway, UsersService],
  controllers: [],
})
export class GatewayModules {}
