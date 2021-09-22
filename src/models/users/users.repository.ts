import { EntityRepository } from 'typeorm';
import { User } from './entities/user.entity'
import { ModelRepository } from '../model.repository';
import { allUserGroupsForSerializing, UserEntity } from './serializers/user.serializer';
import { plainToClass, classToPlain } from 'class-transformer';

@EntityRepository(User)
export class UsersRepository extends ModelRepository<User, UserEntity> {
  transform(model: User): UserEntity {
    const transformOptions = {
      groups: allUserGroupsForSerializing
    }

    return plainToClass(
      UserEntity,
      classToPlain(model, transformOptions),
      transformOptions
    )
  }

  transformMany(models: User[]): UserEntity[] {
    return models.map(model => this.transform(model));
  }
}