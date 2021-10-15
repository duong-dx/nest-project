import { IConversation } from '../interfaces/conversation.interface';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Emojis, Backgrounds } from '../interfaces/conversation.interface';

@Entity({ name: 'conversations' })
export class Conversation implements IConversation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'title', nullable: true })
  title: string;

  @Column({ name: 'background', nullable: true, default: 'white' })
  background: Backgrounds;

  @Column({ name: 'emoji', nullable: true, default: 'white'})
  emoji: Emojis;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;
}
