import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserEntity } from './serializers/user.serializer';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  async findAll(
    relations: string[] = [],
    throwsException = false,
  ): Promise<UserEntity[]> {
    return await this.usersRepository.getAllEntity(relations, throwsException);
  }

  async create(inputs: CreateUserDto): Promise<UserEntity> {
    return await this.usersRepository.createEntity(inputs);
  }

  async findById(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<UserEntity> {
    return await this.usersRepository.getEntityById(
      id,
      relations,
      throwsException,
    );
  }

  async findUserAndMessageReadById(
    id: number,
    status: number | null,
  ): Promise<UserEntity> {
    return await this.usersRepository.findUserAndMessageReadById(id, status);
  }

  async update(user: UserEntity, inputs: User): Promise<UserEntity> {
    return await this.usersRepository.updateEntity(user, inputs);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.usersRepository.deleteEntityById(id);
  }

  async geUsersByEmail(email: string): Promise<UserEntity[]> {
    return await this.usersRepository.getUsersByEmail(email);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.getUserByEmail(email);
  }

  async findAllConversations(
    user_id: number | string,
  ): Promise<User | UserEntity | null> {
    const data = await this.usersRepository.findAllConversation(user_id);
    if (!data) {
      return null;
    }

    data.conversations = data.conversations
      ? data.conversations.map((conversation) => {
          conversation.users = conversation.users
            ? conversation.users.map((user) => {
                return {
                  ...user,
                  last_message_id:
                    user?.last_message_id?.last_message_id || null,
                };
              })
            : [];

          conversation.messages = conversation.messages
            ? [conversation.messages]
            : [];
          return conversation;
        })
      : [];

    return data;
  }
}
