import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTargetSOSDto {
  @IsNotEmpty()
  storeId: string;

  @IsNotEmpty()
  categoryId: string;

  @IsNumber()
  target: number;
}
