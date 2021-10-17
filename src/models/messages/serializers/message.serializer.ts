import { IMessage } from '../interfaces/message.interface';
import { ModelEntity } from '../../model.serializer';

export class MessageEntity extends ModelEntity implements IMessage {
  id: number | string;

  conversation_id: null | number;

  user_id: null | number;

  status: boolean;

  message: string | null;

  createdAt: Date;

  updatedAt: Date;
}
