import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from './photo.entity';
import { Expose } from 'class-transformer';

@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;

  @Column()
  name: string;

  @Column({
    comment: '邮箱2',
  })
  email: string;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  is_active: number;

  @Expose()
  get userInfo(): string {
    return `${this.name} 年龄 ${this.age}`;
  }
}
