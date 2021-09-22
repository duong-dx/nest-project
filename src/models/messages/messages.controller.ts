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
  extendedMessageGroupsForSerializing,
  MessageEntity,
} from './serializers/message.serializer';
import {MessagesService} from './messages.service';
import { Message } from './entities/message.entity';

@Controller('messages')
@SerializeOptions({
  groups: extendedMessageGroupsForSerializing,
})
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Get('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async index() {
    return this.messageService.findAll()
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getById(
    @Param() params
  ): Promise<MessageEntity> {
    const message = await this.messageService.findById(params.id);
    this.throwMessageNotFound(message)
    return message
  }

  @Post('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body() inputs: Message,
  ): Promise<MessageEntity> {
    return await this.messageService.create(inputs);
  }

  @Put('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param() params,
    @Body() inputs: Message,
  ): Promise<MessageEntity> {
    const message = await this.messageService.findById(parseInt(params.id, 0))
    this.throwMessageNotFound(message)
    return await this.messageService.update(message, inputs);
  }

  @Delete('/:id')
  async delete(
    @Param() params,
  ): Promise<Boolean> {
    const message = await this.messageService.findById(parseInt(params.id, 0))
    this.throwMessageNotFound(message)
    return await this.messageService.deleteById(params.id);
  }

  throwMessageNotFound(
    message: MessageEntity
  ) {
    if (!message) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
  }
}