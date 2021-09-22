import { IUser } from '../interfaces/user.interface';
import { Expose } from 'class-transformer';
import { ModelEntity } from '../../model.serializer';

export const defaultUserGroupsForSerializing: string[] = ['user.timestamps'];
export const extendedUserGroupsForSerializing: string[] = [
  ...defaultUserGroupsForSerializing,
];
export const allUserGroupsForSerializing: string[] = [
  ...extendedUserGroupsForSerializing,
  'user.password',
];

export class UserEntity extends ModelEntity implements IUser {
  id: number | string

  email: string;

  name: null | string;

  gender: boolean;

  address: string | null;

  @Expose({ groups: ['user.birthday'] })
  birthday: Date;

  @Expose({ groups: ['user.password'] })
  password: string;

  @Expose({ groups: ['user.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['user.timestamps'] })
  updatedAt: Date;

}