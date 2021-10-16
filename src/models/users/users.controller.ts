import {
  Get,
  Put,
  Post,
  Body,
  Delete,
  Param,
  Controller,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  UserEntity,
  extendedUserGroupsForSerializing,
} from './serializers/user.serializer';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import { AuthenticationGuard } from '../../auth/guards/auth.guard';

@UseGuards(AuthenticationGuard)
@Controller('users')
@SerializeOptions({
  groups: extendedUserGroupsForSerializing,
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async index() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
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
  @UseInterceptors(ClassSerializerInterceptor)
  async userConversation(@Param() params): Promise<UserEntity> {
    const user = await this.usersService.findById(params.id, [
      'profile',
      'conversations',
      'conversations.messages',
    ]);
    this.throwUserNotFound(user);
    return user;
  }

  @Post('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() inputs: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.create(inputs);
  }

  @Put('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
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

  throwUserNotFound(user: UserEntity) {
    if (!user) {
      throw new HttpException("User don't exists", HttpStatus.NOT_FOUND);
    }
  }
}
