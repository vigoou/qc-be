import { IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;
}
