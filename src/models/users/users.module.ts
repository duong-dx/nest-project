import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { ConfigModule } from '@nestjs/config';
import { JsonWebTokenStrategy } from '../../auth/strategies/jwt-strategy';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UsersRepository])],
  controllers: [UsersController],
  providers: [UsersService, ConfigModule, JsonWebTokenStrategy],
  exports: [UsersService],
})
export class UsersModule {}
