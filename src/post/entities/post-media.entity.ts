import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

@Entity('post_media')
export class PostMedia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'enum', enum: MediaType })
  type: MediaType;

  @ManyToOne(() => Post, (post) => post.media, {
    onDelete: 'CASCADE',
  })
  post: Post;
}
