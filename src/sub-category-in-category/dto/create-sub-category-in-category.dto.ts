import { IsNotEmpty } from 'class-validator';

export class CreateSubCategoryInCategoryDto {
  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  subCategoryId: string;
}
