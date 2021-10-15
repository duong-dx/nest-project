import { EntityRepository } from 'typeorm';
import { UserConversation } from './entities/user-conversation.entity';
import { ModelRepository } from '../model.repository';
import { UserConversationEntity } from './serializers/user-conversation.serializer';
import { plainToClass, classToPlain } from 'class-transformer';

@EntityRepository(UserConversation)
export class UserConversationRepository extends ModelRepository<
  UserConversation,
  UserConversationEntity
> {
  transform(model: UserConversation): UserConversationEntity {
    const transformOptions = {};

    return plainToClass(
      UserConversationEntity,
      classToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: UserConversation[]): UserConversationEntity[] {
    return models.map((model) => this.transform(model));
  }
}
