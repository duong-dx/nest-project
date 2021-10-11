import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesRepository } from './messages.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([MessagesRepository])],
  controllers: [MessagesController],
  providers: [MessagesService, ConfigModule],
  exports: [MessagesService],
})
export class MessagesModule {}
