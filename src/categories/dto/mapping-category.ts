import { Prisma } from '@prisma/client';
import { CreateCategoryDto } from './create-category.dto';

export function transformCategoryCreateInput(
  data: CreateCategoryDto,
): Prisma.CategoryCreateInput {
  const createCategory: Prisma.CategoryCreateInput = {
    id: data.id,
    name: data.name,
    nameVN: data.nameVN,
    code: data.code,
    status: data.status ?? true,
  };

  return createCategory;
}
