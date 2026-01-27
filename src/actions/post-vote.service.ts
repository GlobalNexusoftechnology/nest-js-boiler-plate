import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostVote, VoteType } from './entities/post-vote.entity';
import { Users } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class PostVoteService {
  constructor(
    @InjectRepository(PostVote)
    private voteRepo: Repository<PostVote>,
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
  ) {}

  async vote(postId: string, user: Users, vote: VoteType) {
    const post = await this.postRepo.findOne({ where: { id: postId } });
    if (!post) throw new BadRequestException('Post not found');

    const existing = await this.voteRepo.findOne({
      where: { post: { id: postId }, user: { id: user.id } },
    });

    if (!existing) {
      await this.voteRepo.save({
        post,
        user,
        vote,
        created_on: Date.now(),
      });
    } else if (existing.vote === vote) {
      await this.voteRepo.remove(existing); // remove vote
    } else {
      existing.vote = vote;
      await this.voteRepo.save(existing); // switch vote
    }

    const upvotes = await this.voteRepo.count({
      where: { post, vote: VoteType.UP },
    });
    const downvotes = await this.voteRepo.count({
      where: { post, vote: VoteType.DOWN },
    });

    return {
      upvotes,
      downvotes,
      myVote: existing?.vote === vote ? null : vote,
    };
  }
}
