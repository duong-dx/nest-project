import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsRepository } from './conversations.repository';
import { ConfigModule } from '@nestjs/config';
import { JsonWebTokenStrategy } from '../../auth/strategies/jwt-strategy';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ConversationsRepository])],
  controllers: [ConversationsController],
  providers: [ConversationsService, ConfigModule, JsonWebTokenStrategy],
  exports: [ConversationsService],
})
export class ConversationsModule {}
