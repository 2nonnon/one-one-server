import { IsNotEmpty } from 'class-validator';

export class UpdateOrderReceiveInfoDto {
  @IsNotEmpty()
  receive_info: string;
}
