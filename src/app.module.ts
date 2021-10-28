import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './orm-config';
import { MessagesModule } from './models/messages/messages.module';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConversationsModule } from './models/conversations/conversations.module';
import { UserConversationModule } from './models/user_conversation/user-conversation.module';
import { ProfilesModule } from './models/profiles/profiles.module';
import { GatewayModules } from './gatewaies/gateway.modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
    MessagesModule,
    UsersModule,
    AuthModule,
    ConversationsModule,
    UserConversationModule,
    ProfilesModule,
    GatewayModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
