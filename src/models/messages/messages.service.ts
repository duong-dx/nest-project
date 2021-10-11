import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesRepository } from './messages.repository';
import { MessageEntity } from './serializers/message.serializer';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesRepository)
    private usersRepository: MessagesRepository,
  ) {}

  async findAll(
    relations: string[] = [],
    throwsException = false,
  ): Promise<MessageEntity[]> {
    return await this.usersRepository.getAllEntity(relations, throwsException);
  }

  async create(inputs: Message): Promise<MessageEntity> {
    return await this.usersRepository.createEntity(inputs);
  }

  async findById(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<MessageEntity> {
    return await this.usersRepository.getEntityById(
      id,
      relations,
      throwsException,
    );
  }

  async update(user: MessageEntity, inputs: Message): Promise<MessageEntity> {
    return await this.usersRepository.updateEntity(user, inputs);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.usersRepository.deleteEntityById(id);
  }
}
