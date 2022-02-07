import {
  Get,
  Put,
  Post,
  Body,
  Delete,
  Param,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserEntity } from './serializers/user.serializer';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import { AuthenticationGuard } from '../../auth/guards/auth.guard';

@UseGuards(AuthenticationGuard)
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async index() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async getById(@Param() params): Promise<UserEntity> {
    const user = await this.usersService.findById(params.id, ['messages']);
    this.throwUserNotFound(user);
    return user;
  }

  @Get('messages/:id/:status')
  @UseInterceptors(ClassSerializerInterceptor)
  async getByIdAndMessageStatus(@Param() params): Promise<UserEntity> {
    const user = await this.usersService.findUserAndMessageReadById(
      params.id,
      params.status,
    );
    this.throwUserNotFound(user);
    return user;
  }

  @Get('conversation/:id')
  async userConversation(@Param() params): Promise<UserEntity> {
    const user = await this.usersService.findById(params.id, [
      'profile',
      'conversations',
      'conversations.messages',
    ]);
    this.throwUserNotFound(user);
    return user;
  }

  @Get('conversations/get')
  async getAllConversation(@Request() request): Promise<User | UserEntity> {
    const user = await this.usersService.findAllConversations(request.user.id);
    this.throwUserNotFound(user);
    return user;
  }

  @Post('/')
  async create(@Body() inputs: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.create(inputs);
  }

  @Put('/:id')
  async update(@Param() params, @Body() inputs: User): Promise<UserEntity> {
    const user = await this.usersService.findById(parseInt(params.id, 0));
    this.throwUserNotFound(user);
    return await this.usersService.update(user, inputs);
  }

  @Delete('/:id')
  async delete(@Param() params): Promise<boolean> {
    const user = await this.usersService.findById(parseInt(params.id, 0));
    this.throwUserNotFound(user);
    return await this.usersService.deleteById(params.id);
  }

  @Get('/users/:email')
  async geUsersByEmail(@Param() params) {
    return this.usersService.geUsersByEmail(params.email);
  }

  throwUserNotFound(user: User | UserEntity) {
    if (!user) {
      throw new HttpException("User don't exists", HttpStatus.NOT_FOUND);
    }
  }
}
