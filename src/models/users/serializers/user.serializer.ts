import { IUser } from '../interfaces/user.interface';
import { ModelEntity } from '../../model.serializer';

export class UserEntity extends ModelEntity implements IUser {
  id: number;

  email: string;

  name: null | string;

  password: string;

  createdAt: Date;

  updatedAt: Date;
}
