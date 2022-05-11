import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsString()
  userId: string;

  @Type(() => Number)
  goodId: number;
}
