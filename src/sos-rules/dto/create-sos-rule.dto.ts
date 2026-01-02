import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSOSRuleDto {
  @IsNotEmpty()
  ruleBig: string;

  @IsNotEmpty()
  ruleSmall: string;

  @IsOptional()
  note?: string;

  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  subCategoryId: string;

  @IsNotEmpty()
  brandId: string;
}
