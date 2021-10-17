import { Gender, IProfile, Position } from '../interfaces/profile.interface';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'profiles' })
export class Profile implements IProfile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'user_id', nullable: true })
  user_id: number;

  @Column({ name: 'avatar', nullable: true })
  avatar: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'gender', nullable: true })
  gender: Gender;

  @Column({ name: 'position', nullable: true })
  position: Position;

  @Column({
    name: 'birthday',
    default: null,
    nullable: true,
  })
  birthday: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
