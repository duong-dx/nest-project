import {
  Get,
  Put,
  Post,
  Body,
  Delete,
  Param,
  Controller,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ConversationEntity } from './serializers/conversation.serializer';
import { ConversationsService } from './conversations.service';
import { Conversation } from './entities/conversation.entity';
import { AuthenticationGuard } from '../../auth/guards/auth.guard';

@UseGuards(AuthenticationGuard)
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationService: ConversationsService) {}

  @Get('/')
  async index() {
    return this.conversationService.findAll([
      'users',
    ]);
  }

  @Get('/:id')
  async getById(@Param() params): Promise<ConversationEntity> {
    const Conversation = await this.conversationService.findById(params.id);
    this.throwConversationNotFound(Conversation);
    return Conversation;
  }

  @Post('/')
  async create(@Body() inputs: Conversation): Promise<ConversationEntity> {
    return await this.conversationService.create(inputs);
  }

  @Put('/:id')
  async update(
    @Param() params,
    @Body() inputs: Conversation,
  ): Promise<ConversationEntity> {
    const Conversation = await this.conversationService.findById(
      parseInt(params.id, 0),
    );
    this.throwConversationNotFound(Conversation);
    return await this.conversationService.update(Conversation, inputs);
  }

  @Delete('/:id')
  async delete(@Param() params): Promise<boolean> {
    const Conversation = await this.conversationService.findById(
      parseInt(params.id, 0),
    );
    this.throwConversationNotFound(Conversation);
    return await this.conversationService.deleteById(params.id);
  }

  @Get('socket/:id')
  async getDataInformation(@Param() params): Promise<any> {
    const conversation = await this.conversationService.findById(params.id, [
      'users',
    ]);

    const userId = [];
    conversation.users.map((user) => {
      userId.push(user.id);
      return user;
    });

    return userId;
  }

  throwConversationNotFound(Conversation: ConversationEntity) {
    if (!Conversation) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
