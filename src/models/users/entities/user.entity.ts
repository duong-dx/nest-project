import { IUser } from '../interfaces/user.interface';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Message } from '../../messages/entities/message.entity';
import { Conversation } from '../../conversations/entities/conversation.entity';
import { Profile } from '../../profiles/entities/profile.entity';
import { Information } from "../../information/entities/information.entity";
import { UserConversation } from "../../user_conversation/entities/user-conversation.entity";

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 25, nullable: true })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ name: 'password', length: 255 })
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(
    () => UserConversation,
    (userConversation) => userConversation.user,
  )
  userConversation?: UserConversation[];

  @OneToMany(() => Message, (message) => message.user)
  messages?: Message[];

  @OneToMany(() => Information, (information) => information.user, {
    eager: true,
  })
  information?: Information[];

  @ManyToMany(() => Conversation, (conversations) => conversations.users)
  @JoinTable({
    name: 'user_conversation',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'conversation_id' },
  })
  conversations: Conversation[];
}
