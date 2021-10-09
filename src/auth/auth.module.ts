import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../models/users/users.service';
import { UsersRepository } from '../models/users/users.repository';

@Module({
  imports: [UsersService, UsersRepository],
  providers: [AuthService, UsersRepository],
  controllers: [AuthController]
})
export class AuthModule {}
