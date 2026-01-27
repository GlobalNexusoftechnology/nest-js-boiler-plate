import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { Authorize } from 'src/packages/authorization/roles.decorator';
import { PermissionKey } from 'src/packages/authorization/permission-key.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/config/cloudinary.service';
import { Public } from 'src/public-strategy';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  @Public()
  @Post()
  // @Authorize([PermissionKey.CreateUser])
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Get()
  // @Authorize([PermissionKey.GetUser])
  findAll() {
    return this.userService.findAll();
  }

  @Patch('me')
  @UseInterceptors(FileInterceptor('profile_photo'))
  async updateProfile(
    @Req() req: any,
    @Body() dto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const userId = req.user.id;

    if (file) {
      const uploaded = await this.cloudinary.uploadFile(file);
      dto.profile_photo = uploaded.secure_url;
    }

    return this.userService.update(userId, dto);
  }

  @Get(':id')
  @Authorize([PermissionKey.GetUser])
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Authorize([PermissionKey.EditUser])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Authorize([PermissionKey.DeleteUser])
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
