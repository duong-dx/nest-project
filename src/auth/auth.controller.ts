import {
  Body,
  Controller, Get,
  HttpException,
  HttpStatus,
  Post,
  Request, UseGuards
} from "@nestjs/common";
import { CreateUserDto } from '../models/users/dto/CreateUser.dto';
import { UsersService } from '../models/users/users.service';
import { LoginUserDto } from '../models/users/dto/LoginUser.dto';
import { AuthService } from './services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationGuard } from "./auth.guard";
import { AuthPayload } from "./interfaces/auth-payload.interface";
import { LocalAuthGuard } from "./local.guard";

@Controller()
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  async registerUser(@Body() input: CreateUserDto) {
    const check = await this.validate(input.email);
    if (!check) {
      throw new HttpException(
        { message: 'User already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }

    input.password = await this.authService.hashPassword(input.password);
    return this.userService.create(input);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() request): Promise<any> {
    return this.authService.login(request.user);
  }

  @UseGuards(AuthenticationGuard)
  @Get('current-user')
  async getUserLoggedIn(@Request() request): Promise<AuthPayload> {
    return request.user;
  }

  async validate(email: string) {
    try {
      const users = await this.userService.geUsersByEmail(email);
      return users.length <= 0;
    } catch (e) {
      return false;
    }
  }
}
