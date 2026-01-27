import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostComment } from './entities/post-comment.entity';
import { Users } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class PostCommentService {
  constructor(
    @InjectRepository(PostComment)
    private commentRepo: Repository<PostComment>,
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
  ) {}

  async addComment(postId: string, user: Users, comment: string) {
    const post = await this.postRepo.findOne({ where: { id: postId } });
    if (!post) throw new BadRequestException('Post not found');

    return this.commentRepo.save({
      post,
      user,
      comment,
      created_on: Date.now(),
    });
  }

  async getComments(postId: string) {
    return this.commentRepo.find({
      where: { post: { id: postId }, deleted: false },
      relations: ['user'],
      order: { created_on: 'ASC' },
    });
  }
}
