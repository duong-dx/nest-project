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
} from '@nestjs/common';
import { UserConversationEntity } from './serializers/user-conversation.serializer';
import { UserConversationService } from './user-conversation.service';
import { UserConversation } from './entities/user-conversation.entity';
import { UpdateLastMessage } from './interfaces/user-conversation.interface';

@Controller('user-conversation')
export class UserConversationController {
  constructor(
    private readonly userConversationService: UserConversationService,
  ) {}

  @Get('/')
  async index() {
    return this.userConversationService.findAll();
  }

  @Get('/:id')
  async getById(@Param() params): Promise<UserConversationEntity> {
    const UserConversation = await this.userConversationService.findById(
      params.id,
    );
    this.throwUserConversationNotFound(UserConversation);
    return UserConversation;
  }

  @Post('/')
  async create(
    @Body() inputs: UserConversation,
  ): Promise<UserConversationEntity> {
    return await this.userConversationService.create(inputs);
  }

  @Put('/:id')
  async update(
    @Param() params,
    @Body() inputs: UserConversation,
  ): Promise<UserConversationEntity> {
    const UserConversation = await this.userConversationService.findById(
      parseInt(params.id, 0),
    );
    this.throwUserConversationNotFound(UserConversation);
    return await this.userConversationService.update(UserConversation, inputs);
  }

  @Put('update/last-message')
  async updateLastMessageId(
    @Body() inputs: UpdateLastMessage,
  ): Promise<UserConversationEntity> {
    const userConversation =
      await this.userConversationService.findDataUserConversation(
        inputs.user_id,
        inputs.conversation_id,
      );

    this.throwUserConversationNotFound(userConversation);

    const result = await this.userConversationService.updateLastMessageId(
      userConversation,
      inputs.message_id,
    );
    console.log(result);
    
    return result;
  }

  @Delete('/:id')
  async delete(@Param() params): Promise<boolean> {
    const UserConversation = await this.userConversationService.findById(
      parseInt(params.id, 0),
    );
    this.throwUserConversationNotFound(UserConversation);
    return await this.userConversationService.deleteById(params.id);
  }

  throwUserConversationNotFound(UserConversation: UserConversationEntity) {
    if (!UserConversation) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
