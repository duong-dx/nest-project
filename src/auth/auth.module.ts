import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../models/users/users.service';
import { UsersRepository } from '../models/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../models/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JsonWebTokenStrategy } from '../jwt-strategy';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule,
    JwtModule.register({
      secret: '12345678',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, UsersService, LocalStrategy, JsonWebTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
