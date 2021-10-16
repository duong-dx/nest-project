import { IUserConversation } from '../interfaces/user-conversation.interface';
import { Expose } from 'class-transformer';
import { ModelEntity } from '../../model.serializer';

export class UserConversationEntity
  extends ModelEntity
  implements IUserConversation
{
  id: number;

  user_id: null | number;

  conversation_id: null | number;

  mute: boolean;

  block: boolean;

  createdAt: Date;

  updatedAt: Date;
}
