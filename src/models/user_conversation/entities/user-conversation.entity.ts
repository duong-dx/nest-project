import { IUserConversation } from '../interfaces/user-conversation.interface';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Conversation } from '../../conversations/entities/conversation.entity';

@Entity({ name: 'user_conversation' })
export class UserConversation implements IUserConversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: true })
  user_id: number;

  @Column({ name: 'conversation_id', nullable: true })
  conversation_id: number;

  @Column({ name: 'last_message_id', nullable: true })
  last_message_id: number;

  @Column({ name: 'mute', default: false })
  mute: boolean;

  @Column({ name: 'block', default: false })
  block: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.userConversation)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(
    () => Conversation,
    (conversation) => conversation.userConversation,
  )
  @JoinColumn({ name: 'conversation_id' })
  conversation?: Conversation;
}
