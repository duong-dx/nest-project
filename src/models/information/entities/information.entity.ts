import {
  IInformation,
  TypeInformation,
} from '../interfaces/information.interface';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'information' })
export class Information implements IInformation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'user_id', nullable: true })
  user_id: number | string;

  @Column({ name: 'status', default: false })
  status: boolean;

  @Column({ name: 'type' })
  type: TypeInformation;

  @Column({ name: 'value', length: 255 })
  value: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
