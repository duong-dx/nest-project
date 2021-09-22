import { Column } from 'typeorm'
import { IUser } from '../interfaces/user.interface'
import { Entity,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({length: 25, nullable: true})
  name: string

  @Column({length: 255})
  email: string

  @Column({name: 'address', length: 255})
  address: string

  @Column({default: 0})
  gender: boolean

  @Column({
    name: 'birthday',
    default: null,
    nullable: true
  })
  birthday: Date

  @Column({name: 'password', length: 255})
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;
}