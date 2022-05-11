import { IsString } from 'class-validator';

export class CreateNoticeDto {
  @IsString()
  url: string;

  @IsString()
  position: string;
}
