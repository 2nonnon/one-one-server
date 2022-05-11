import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateAdminDto {
  @Type(() => Number)
  level: number;

  @IsOptional()
  @IsString()
  permission: string;

  @IsString()
  name: string;

  @IsString()
  account: string;

  @IsString()
  password: string;
}
