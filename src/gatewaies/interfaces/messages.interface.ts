import { UserEntity } from '../../models/users/serializers/user.serializer';

export interface MessagesInterface {
  message: string;
  conversation_id: number;
  user_id: number | string;
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
  user: UserEntity;
}
