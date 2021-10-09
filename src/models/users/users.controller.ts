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
  ClassSerializerInterceptor, HttpException, HttpStatus,
} from '@nestjs/common';
import {
  UserEntity,
  extendedUserGroupsForSerializing,
} from './serializers/user.serializer';
import {UsersService} from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
@SerializeOptions({
  groups: extendedUserGroupsForSerializing,
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async index() {
    return this.usersService.findAll()
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getById(
    @Param() params
  ): Promise<UserEntity> {
    const user = await this.usersService.findById(params.id);
    this.throwUserNotFound(user)
    return user
  }

  @Post('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body() inputs: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.usersService.create(inputs);
  }

  @Put('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param() params,
    @Body() inputs: User,
  ): Promise<UserEntity> {
    const user = await this.usersService.findById(parseInt(params.id, 0))
    this.throwUserNotFound(user)
    return await this.usersService.update(user, inputs);
  }

  @Delete('/:id')
  async delete(
    @Param() params,
  ): Promise<Boolean> {
    const user = await this.usersService.findById(parseInt(params.id, 0))
    this.throwUserNotFound(user)
    return await this.usersService.deleteById(params.id);
  }

  @Get('/user/:email')
  async getDataByEmail(
    @Param() params
  ) {
    return this.usersService.getDataByEmail(params.email);
  }

  throwUserNotFound(
    user: UserEntity
  ) {
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
  }
}