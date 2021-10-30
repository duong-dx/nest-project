import { EntityRepository } from 'typeorm';
import { Information } from './entities/information.entity';
import { ModelRepository } from '../model.repository';
import { InformationEntity } from './serializers/information.serializer';
import { plainToClass, classToPlain } from 'class-transformer';

@EntityRepository(Information)
export class InformationRepository extends ModelRepository<
  Information,
  InformationEntity
> {
  transform(model: Information): InformationEntity {
    const transformOptions = {};

    return plainToClass(
      InformationEntity,
      classToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: Information[]): InformationEntity[] {
    return models.map((model) => this.transform(model));
  }
}
