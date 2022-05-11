import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @Type(() => Number)
  level: number;

  @IsOptional()
  @IsString()
  permission: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  password: string;
}
