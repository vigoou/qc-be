import { IsNotEmpty, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  productCode: string;

  @IsOptional()
  oldProductCode?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  nameVN: string;

  @IsNotEmpty()
  packageSize: string;

  @IsNotEmpty()
  barcode: string;

  @IsInt()
  length: number;

  @IsNotEmpty()
  unit: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsNotEmpty()
  brandId: string;

  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  subCategoryId: string;
}
