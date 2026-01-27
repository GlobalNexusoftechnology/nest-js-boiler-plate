import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';

@Entity('post_comments')
export class PostComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => Users, { onDelete: 'CASCADE' })
  user: Users;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'bigint' })
  created_on: number;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
