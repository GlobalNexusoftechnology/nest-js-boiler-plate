import { IsEnum } from 'class-validator';
import { VoteType } from '../entities/post-vote.entity';

export class VotePostDto {
  @IsEnum(VoteType)
  vote: VoteType;
}
