import { IConversation } from '../interfaces/conversation.interface';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Emojis, Backgrounds } from '../interfaces/conversation.interface';
import { User } from '../../users/entities/user.entity';
import { Message } from '../../messages/entities/message.entity';
import { UserConversation } from "../../user_conversation/entities/user-conversation.entity";

@Entity({ name: 'conversations' })
export class Conversation implements IConversation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'title', nullable: true })
  title: string;

  @Column({ name: 'description', nullable: true, length: 5000 })
  description: string;

  @Column({ name: 'background', nullable: true, default: 'white' })
  background: Backgrounds;

  @Column({ name: 'emoji', nullable: true, default: 'white' })
  emoji: Emojis;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @OneToMany(() => Message, (message) => message.conversation)
  messages?: Message[];

  @OneToMany(
    () => UserConversation,
    (userConversation) => userConversation.conversation,
  )
  userConversation?: UserConversation[];

  @ManyToMany(() => User, (users) => users.conversations)
  @JoinTable({
    name: 'user_conversation',
    joinColumn: { name: 'conversation_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];
}
