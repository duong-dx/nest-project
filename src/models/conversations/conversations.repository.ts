import { EntityRepository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { ModelRepository } from '../model.repository';
import { ConversationEntity } from './serializers/conversation.serializer';
import { plainToClass, classToPlain } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Conversation)
export class ConversationsRepository extends ModelRepository<
  Conversation,
  ConversationEntity
> {
  async findAllBuyUserId(
    user_id: number | string,
    relations: string[] = [],
    throwsException = false,
  ): Promise<ConversationEntity[] | null> {
    return await this.find({
      where: { user_id },
      relations,
    }).then((entities) => {
      if (!entities && throwsException) {
        return Promise.reject(new NotFoundException('Model not found'));
      }
      return Promise.resolve(entities ? this.transformMany(entities) : null);
    });
  }

  transform(model: Conversation): ConversationEntity {
    const transformOptions = {};

    return plainToClass(
      ConversationEntity,
      classToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: Conversation[]): ConversationEntity[] {
    return models.map((model) => this.transform(model));
  }
}
