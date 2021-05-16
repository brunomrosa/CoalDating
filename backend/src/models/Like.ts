import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('likes')
class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_one: string;

  @Column()
  user_two: string;

  @Column()
  user_one_liked: boolean;

  @Column({ default: false })
  user_two_liked: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Like;
