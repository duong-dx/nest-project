import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserConversationRepository } from './user-conversation.repository';
import { UserConversationEntity } from './serializers/user-conversation.serializer';
import { UserConversation } from './entities/user-conversation.entity';

@Injectable()
export class UserConversationService {
  constructor(
    @InjectRepository(UserConversationRepository)
    private userConversationRepository: UserConversationRepository,
  ) {}

  async findAll(
    relations: string[] = [],
    throwsException = false,
  ): Promise<UserConversationEntity[]> {
    return await this.userConversationRepository.getAllEntity(
      relations,
      throwsException,
    );
  }

  async create(inputs: UserConversation): Promise<UserConversationEntity> {
    return await this.userConversationRepository.createEntity(inputs);
  }

  async findById(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<UserConversationEntity> {
    return await this.userConversationRepository.getEntityById(
      id,
      relations,
      throwsException,
    );
  }

  async update(
    UserConversation: UserConversationEntity,
    inputs: UserConversation,
  ): Promise<UserConversationEntity> {
    return await this.userConversationRepository.updateEntity(
      UserConversation,
      inputs,
    );
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.userConversationRepository.deleteEntityById(id);
  }
}
