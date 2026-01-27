import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Users } from 'src/user/entities/user.entity';
import { PostMedia } from './post-media.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  caption?: string;

  @Column({ type: 'int', default: 0 })
  likes_count: number;

  @ManyToOne(() => Users, (user) => user.id, { onDelete: 'CASCADE' })
  user: Users;

  @OneToMany(() => PostMedia, (media) => media.post, {
    cascade: true,
  })
  media: PostMedia[];

  @Column({ type: 'bigint' })
  created_on: number;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
