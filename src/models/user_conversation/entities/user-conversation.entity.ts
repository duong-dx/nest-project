import { IUserConversation } from '../interfaces/user-conversation.interface';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user_conversation' })
export class UserConversation implements IUserConversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: true })
  user_id: number;

  @Column({ name: 'conversation_id', nullable: true })
  conversation_id: number;

  @Column({ name: 'mute', default: false })
  mute: boolean;

  @Column({ name: 'block', default: false })
  block: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;
}
