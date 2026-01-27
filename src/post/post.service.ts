import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { PostMedia, MediaType } from './entities/post-media.entity';
import { Users } from 'src/user/entities/user.entity';
import { CloudinaryService } from 'src/config/cloudinary.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(PostMedia)
    private mediaRepository: Repository<PostMedia>,

    private cloudinaryService: CloudinaryService,
  ) {}

  async createPost(user: Users, caption: string, files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Post must have at least one media file');
    }

    const post = this.postRepository.create({
      caption,
      user,
      created_on: Math.floor(Date.now() / 1000),
    });

    const savedPost = await this.postRepository.save(post);

    for (const file of files) {
      const uploaded: any = await this.cloudinaryService.uploadFile(file);

      const media = this.mediaRepository.create({
        url: uploaded.secure_url,
        type: file.mimetype.startsWith('video')
          ? MediaType.VIDEO
          : MediaType.IMAGE,
        post: savedPost,
      });

      await this.mediaRepository.save(media);
    }

    return {
      message: 'Post created successfully',
      post_id: savedPost.id,
    };
  }

  async getFeed() {
    return this.postRepository.find({
      where: { deleted: false },
      relations: ['user', 'media'],
      order: { created_on: 'DESC' },
    });
  }
}
