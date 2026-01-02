import { Prisma } from '@prisma/client';
import { CreateSubCategoryInCategoryDto } from './create-sub-category-in-category.dto';

export function transformSubCategoryInCategoryCreateInput(
  data: CreateSubCategoryInCategoryDto,
): Prisma.SubCategoryInCategoryCreateInput {
  const createSubCategoryInCategory: Prisma.SubCategoryInCategoryCreateInput = {
    category: { connect: { id: data.categoryId } },
    subCategory: { connect: { id: data.subCategoryId } },
  };

  return createSubCategoryInCategory;
}
