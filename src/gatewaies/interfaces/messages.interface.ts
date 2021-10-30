import { UserEntity } from '../../models/users/serializers/user.serializer';

export interface MessagesInterface {
  message: string;
  room: string;
  user: UserEntity;
}
