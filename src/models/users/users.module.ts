import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UsersRepository])],
  controllers: [UsersController],
  providers: [UsersService, ConfigModule],
  exports: [UsersService],
  // imports: [MessagesRepository],
  // controllers: [MessagesController],
  // providers: [MessagesService, MessagesRepository],
  // exports: [MessagesService],
})

export class UsersModule {}
// export class MessagesModule implements NestModule {
//   configure(consumer: MiddlewareConsumer): any {
//     consumer
//       .apply(UserMiddleware)
//       .forRoutes('users');
//   }
//
// }
