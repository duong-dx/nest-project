import { UserEntity } from '../../models/users/serializers/user.serializer';

export interface MessagesInterface {
  message: string;
  user: UserEntity;
}
