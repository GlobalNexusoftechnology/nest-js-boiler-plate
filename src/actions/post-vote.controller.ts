import { Controller, Post, Param, Body, Req, UseGuards } from '@nestjs/common';
import { PostVoteService } from './post-vote.service';
import { VotePostDto } from './dto/vote-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostVoteController {
  constructor(private readonly voteService: PostVoteService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':postId/vote')
  vote(@Param('postId') postId: string, @Body() dto: VotePostDto, @Req() req) {
    return this.voteService.vote(postId, req.user, dto.vote);
  }
}
