import { IMessage } from '../interfaces/message.interface';
import { Expose } from 'class-transformer';
import { ModelEntity } from '../../model.serializer';

export const defaultMessageGroupsForSerializing: string[] = [
  'message.timestamps',
];
export const extendedMessageGroupsForSerializing: string[] = [
  ...defaultMessageGroupsForSerializing,
];
export const allMessageGroupsForSerializing: string[] = [
  ...extendedMessageGroupsForSerializing,
  'message.conversation_id',
];

export class MessageEntity extends ModelEntity implements IMessage {
  id: number | string;

  conversation_id: null | number;

  status: boolean;

  message: string | null;

  @Expose({ groups: ['message.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['message.timestamps'] })
  updatedAt: Date;
}
