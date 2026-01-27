import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateUserDto {
  @IsOptional() @IsString() full_name?: string;
  @IsOptional() @IsString() profession?: string;
  @IsOptional() @IsString() company?: string;
  @IsOptional() @IsString() short_bio?: string;
  @IsOptional() @IsString() about?: string;

  @IsOptional()
  @IsArray()
  skills?: string[];

  @IsOptional() @IsString() experience?: string;
  @IsOptional() @IsString() location?: string;

  @IsOptional()
  @IsString()
  profile_photo?: string;
}
