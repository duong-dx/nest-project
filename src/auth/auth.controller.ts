import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../models/users/dto/CreateUser.dto';
import { UsersService } from '../models/users/users.service';
import { LoginUserDto } from '../models/users/dto/LoginUser.dto';
import { AuthService } from './services/auth.service';

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

  @Post('/login')
  async handleLogin(@Body() input) {
    console.log(input, 99999);
    const user = await this.userService.getUserByEmail(input.email);
    console.log(user);
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
