import { IsNotEmpty } from 'class-validator';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  nameVN: string;

  @IsNotEmpty()
  code: string;
}
