import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsRepository } from './conversations.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ConversationsRepository])],
  controllers: [ConversationsController],
  providers: [ConversationsService, ConfigModule],
  exports: [ConversationsService],
})
export class ConversationsModule {}
