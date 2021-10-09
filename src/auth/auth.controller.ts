import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../models/users/dto/CreateUser.dto';
import { UsersService } from '../models/users/users.service';

@Controller()
export class AuthController {
  constructor(private userService: UsersService) {
  }

  @Post('/register')
  async registerUser (
    @Body() input: CreateUserDto
  ) {
    console.log(input);
    return this.userService.create(input);
  }

  @Get('/test')
  async getDataByEmail(
    @Param() params
  ) {
    console.log(params)
  }
}
