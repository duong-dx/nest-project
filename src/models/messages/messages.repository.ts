import { EntityRepository } from 'typeorm';
import { Message } from './entities/message.entity';
import { ModelRepository } from '../model.repository';
import { MessageEntity } from './serializers/message.serializer';
import { plainToClass, classToPlain } from 'class-transformer';

@EntityRepository(Message)
export class MessagesRepository extends ModelRepository<
  Message,
  MessageEntity
> {
  transform(model: Message): MessageEntity {
    const transformOptions = {};

    return plainToClass(
      MessageEntity,
      classToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: Message[]): MessageEntity[] {
    return models.map((model) => this.transform(model));
  }
}
