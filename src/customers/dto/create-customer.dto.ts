import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  ka: string;
  channel: string;
}
