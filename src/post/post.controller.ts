import {
  Controller,
  Post as HttpPost,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Body,
  Req,
  Get,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpPost()
  @UseInterceptors(FilesInterceptor('media', 10))
  async createPost(
    @Req() req,
    @Body() dto: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.postService.createPost(req.user, dto.caption, files);
  }

  @Get('feed')
  async getFeed() {
    return this.postService.getFeed();
  }
}
