import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilesRepository } from './profiles.repository';
import { ProfileEntity } from './serializers/profile.serializer';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfilesRepository)
    private profilesRepository: ProfilesRepository,
  ) {}

  async findAll(
    relations: string[] = [],
    throwsException = false,
  ): Promise<ProfileEntity[]> {
    return await this.profilesRepository.getAllEntity(
      relations,
      throwsException,
    );
  }

  async create(inputs: Profile): Promise<ProfileEntity> {
    return await this.profilesRepository.createEntity(inputs);
  }

  async findById(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<ProfileEntity> {
    return await this.profilesRepository.getEntityById(
      id,
      relations,
      throwsException,
    );
  }

  async update(
    profile: ProfileEntity,
    inputs: Profile,
  ): Promise<ProfileEntity> {
    return await this.profilesRepository.updateEntity(profile, inputs);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.profilesRepository.deleteEntityById(id);
  }
}
