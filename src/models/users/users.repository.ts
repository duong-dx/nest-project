import { EntityRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { ModelRepository } from '../model.repository';
import { UserEntity } from './serializers/user.serializer';
import { plainToClass, classToPlain } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { ConversationEntity } from '../conversations/serializers/conversation.serializer';

@EntityRepository(User)
export class UsersRepository extends ModelRepository<User, UserEntity> {
  async getUsersByEmail(email: string): Promise<UserEntity[]> {
    return this.find({
      where: {
        email: email,
      },
    }).then((entity) => {
      if (!entity) {
        return Promise.reject(new NotFoundException('Model not found'));
      }

      return Promise.resolve(entity ? this.transformMany(entity) : null);
    });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({
      where: { email: email },
    }).then((entity) => {
      if (!entity) {
        return Promise.reject(new NotFoundException('Model not found'));
      }

      return Promise.resolve(entity ? this.transform(entity) : null);
    });
  }

  async findUserAndMessageReadById(
    id: number,
    status: number | null,
  ): Promise<any> {
    return await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.messages', 'messages')
      .where('messages.status = :status', { status })
      .andWhere({ id })
      .getOne();
  }

  async findAllConversation(
    user_id: number | string,
  ): Promise<UserEntity | null> {
    console.log(user_id, 2222222222);
    return await this.createQueryBuilder('users')
      .leftJoinAndSelect('users.conversations', 'conversations')
      .leftJoinAndSelect('conversations.users', 'usersInConversation')
      .loadRelationCountAndMap(
        'conversations.unread',
        'conversations.messages',
        'message',
        (qb) => qb.where('message.status = 0'),
      )
      .getOne()
      .then((entity) => {
        if (!entity) {
          return Promise.reject(new NotFoundException('Model not found'));
        }
        return Promise.resolve(entity ? this.transform(entity) : null);
      });
  }

  transform(model: User): UserEntity {
    const transformOptions = {};

    return plainToClass(
      UserEntity,
      classToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: User[]): UserEntity[] {
    return models.map((model) => this.transform(model));
  }
}
