import { IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  nameVN: string;

  @IsNotEmpty()
  code: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
