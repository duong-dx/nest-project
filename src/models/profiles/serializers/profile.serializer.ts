import { IProfile, Gender, Position } from '../interfaces/profile.interface';
import { ModelEntity } from '../../model.serializer';

export class ProfileEntity extends ModelEntity implements IProfile {
  id: number | string;

  user_id: null | number;

  avatar: string | null;

  gender: Gender | null;

  address: string | null;

  phone: string | null;

  position: Position | null;

  description: string | null;

  birthday: Date;

  createdAt: Date;

  updatedAt: Date;
}
