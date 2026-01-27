import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostMedia } from './entities/post-media.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostVote } from 'src/actions/entities/post-vote.entity';
import { PostComment } from 'src/actions/entities/post-comment.entity';
import { PostVoteController } from 'src/actions/post-vote.controller';
import { PostCommentController } from 'src/actions/post-comment.controller';
import { PostVoteService } from 'src/actions/post-vote.service';
import { PostCommentService } from 'src/actions/post-comment.service';
import { CloudinaryModule } from 'src/config/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostMedia, PostVote, PostComment]),
    CloudinaryModule,
  ],
  controllers: [PostController, PostVoteController, PostCommentController],
  providers: [PostService, PostVoteService, PostCommentService],
})
export class PostModule {}
