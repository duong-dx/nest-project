import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
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
  // imports: [MessagesRepository],
  // controllers: [MessagesController],
  // providers: [MessagesService, MessagesRepository],
  // exports: [MessagesService],
})

export class MessagesModule {}
// export class MessagesModule implements NestModule {
//   configure(consumer: MiddlewareConsumer): any {
//     consumer
//       .apply(UserMiddleware)
//       .forRoutes('users');
//   }
//
// }
