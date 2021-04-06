import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import File from './File';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  avatar: string;

  age: number;

  @Column()
  lat: string;

  @Column()
  lon: string;

  @OneToMany(() => File, photo => photo.user)
  photos: File[];

  @Column('text', { array: true })
  likes: string[];

  @Column('text', { array: true })
  dislikes: string[];

  @Column()
  password: string;

  @Column()
  max_distance: number;

  @Column()
  max_age: number;

  @Column()
  birth: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
