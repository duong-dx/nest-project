import {
  Backgrounds,
  Emojis,
  IConversation,
} from '../interfaces/conversation.interface';
import { Expose } from 'class-transformer';
import { ModelEntity } from '../../model.serializer';

export class ConversationEntity extends ModelEntity implements IConversation {
  id: number | string;

  title: string | null;

  description: string | null;

  emoji: Emojis | null;

  background: Backgrounds | null;

  @Expose({ groups: ['message.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['message.timestamps'] })
  updatedAt: Date;
}
