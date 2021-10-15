import { Module } from '@nestjs/common';
import { UserConversationController } from './user-conversation.controller';
import { UserConversationService } from './user-conversation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConversationRepository } from './user-conversation.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserConversationRepository]),
  ],
  controllers: [UserConversationController],
  providers: [UserConversationService, ConfigModule],
  exports: [UserConversationService],
})
export class UserConversationModule {}
