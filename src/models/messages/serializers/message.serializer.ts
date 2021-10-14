import { IMessage } from '../interfaces/message.interface';
import { Expose } from 'class-transformer';
import { ModelEntity } from '../../model.serializer';

export class MessageEntity extends ModelEntity implements IMessage {
  id: number | string;

  conversation_id: null | number;

  user_id: null | number;

  status: boolean;

  message: string | null;

  @Expose({ groups: ['message.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['message.timestamps'] })
  updatedAt: Date;
}
