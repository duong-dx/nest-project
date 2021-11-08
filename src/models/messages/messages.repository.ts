import { EntityRepository } from 'typeorm';
import { Message } from './entities/message.entity';
import { ModelRepository } from '../model.repository';
import { MessageEntity } from './serializers/message.serializer';
import { plainToClass, classToPlain } from 'class-transformer';
import { Pagination } from '../pagination';

@EntityRepository(Message)
export class MessagesRepository extends ModelRepository<
  Message,
  MessageEntity
> {
  async findAllPaginate(
    conversation_id: number | string,
    take: number | null,
    page: number | null,
    relations: string[] = [],
  ): Promise<Pagination<MessageEntity>> {
    const takeRecord = take || 30;
    const paginate = page || 1;
    const skip = (paginate - 1) * takeRecord;
    const [results, total] = await this.findAndCount({
      where: { conversation_id },
      order: { id: 'DESC' },
      relations,
      take: takeRecord,
      skip: skip,
    });

    return new Pagination<MessageEntity>({
      results,
      total,
    });
  }
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
