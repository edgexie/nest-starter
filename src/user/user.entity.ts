import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  is_active: number;

  @Column()
  name: string;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];
}
