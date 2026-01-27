import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostCommentController {
  constructor(private readonly commentService: PostCommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':postId/comments')
  addComment(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @Req() req,
  ) {
    return this.commentService.addComment(postId, req.user, dto.comment);
  }

  @Get(':postId/comments')
  getComments(@Param('postId') postId: string) {
    return this.commentService.getComments(postId);
  }
}
