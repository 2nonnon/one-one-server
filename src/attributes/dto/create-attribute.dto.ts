import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateAttributeDto {
  @IsString()
  name: string;

  @Type(() => Number)
  parentId: number;
}
