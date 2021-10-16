import { EntityRepository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { ModelRepository } from '../model.repository';
import { ProfileEntity } from './serializers/profile.serializer';
import { plainToClass, classToPlain } from 'class-transformer';

@EntityRepository(Profile)
export class ProfilesRepository extends ModelRepository<
  Profile,
  ProfileEntity
> {
  transform(model: Profile): ProfileEntity {
    const transformOptions = {};

    return plainToClass(
      ProfileEntity,
      classToPlain(model, transformOptions),
      transformOptions,
    );
  }

  transformMany(models: Profile[]): ProfileEntity[] {
    return models.map((model) => this.transform(model));
  }
}
