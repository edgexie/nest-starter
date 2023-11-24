import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({ default: 1 })
  isActive: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
