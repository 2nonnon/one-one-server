import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAddressDto {
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  receiver: string;

  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式错误' })
  mobile: string;

  @IsString()
  destination: string;

  @IsOptional()
  @IsString()
  remark?: string;

  @Type(() => Boolean)
  isDefault: boolean;
}
