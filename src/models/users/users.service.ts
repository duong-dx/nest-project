import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { UsersRepository } from './users.repository';
import { UserEntity } from './serializers/user.serializer';
import { IUser } from './interfaces/user.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private  usersRepository: UsersRepository
  ) {}

  async findAll(
    relations: string[] = [],
    throwsException = false
  ): Promise<UserEntity []> {
    return await this.usersRepository.getAllEntity(relations, throwsException)
  }

  async create(
    inputs: User,
  ): Promise<UserEntity> {
    return await this.usersRepository.createEntity(inputs)
  }

  async findById (
    id: number,
    relations: string[] = [],
    throwsException = false
  ): Promise<UserEntity> {
    return await this.usersRepository.getEntityById(id, relations, throwsException)
  }

  async update(
    user: UserEntity,
    inputs: User,
    ): Promise<UserEntity> {
    return await this.usersRepository.updateEntity(user, inputs)
  }

  async deleteById(id: number): Promise<Boolean> {
    return await this.usersRepository.deleteEntityById(id)
  }
}