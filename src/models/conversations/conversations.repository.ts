import { EntityRepository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { ModelRepository } from '../model.repository';
import { ConversationEntity } from './serializers/conversation.serializer';
import { plainToClass, classToPlain } from 'class-transformer';

@EntityRepository(Conversation)
export class ConversationsRepository extends ModelRepository<
  Conversation,
  ConversationEntity
> {
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
