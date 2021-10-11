import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../models/users/users.service';
import { UsersRepository } from '../models/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../models/users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([UsersRepository])],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
