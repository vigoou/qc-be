import { Prisma } from '@prisma/client';
import { CreateSubCategoryDto } from './create-sub-category.dto';

export function transformSubCategoryCreateInput(
  data: CreateSubCategoryDto,
): Prisma.SubCategoryCreateInput {
  const createSubCategory: Prisma.SubCategoryCreateInput = {
    name: data.name,
    nameVN: data.nameVN,
    code: data.code,
  };

  return createSubCategory;
}
