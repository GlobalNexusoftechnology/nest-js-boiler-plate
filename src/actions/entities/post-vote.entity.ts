import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';

export enum VoteType {
  UP = 'up',
  DOWN = 'down',
}

@Entity('post_votes')
export class PostVote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => Users, { onDelete: 'CASCADE' })
  user: Users;

  @Column({ type: 'enum', enum: VoteType })
  vote: VoteType;

  @Column({ type: 'bigint' })
  created_on: number;
}
