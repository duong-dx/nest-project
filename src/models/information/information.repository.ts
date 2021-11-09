import { EntityRepository, In } from 'typeorm';
import { Information } from './entities/information.entity';
import { ModelRepository } from '../model.repository';
import { InformationEntity } from './serializers/information.serializer';
import { plainToClass, classToPlain } from 'class-transformer';
import { TypeInformation } from './interfaces/information.interface';

@EntityRepository(Information)
export class InformationRepository extends ModelRepository<
  Information,
  InformationEntity
> {
  async findSocketId(user_id: number[]) {
    return await this.find({
      where: { user_id: In(user_id), type: TypeInformation.socket_id },
      select: ['value'],
    });
  }

  async deleteByValue(
    user_id: number | string,
    value: string,
  ): Promise<boolean> {
    return await this.delete({
      user_id,
      value,
    })
      .then(() => {
        return true;
      })
      .catch((error) => Promise.reject(error));
  }
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
