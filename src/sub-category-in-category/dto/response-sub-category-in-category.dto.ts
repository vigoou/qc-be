import { Expose } from 'class-transformer';
import { Category, SubCategory } from '@prisma/client';

export class ResponseSubCategoryInCategoryDto {
  @Expose({ name: 'category_id' })
  categoryId: string;

  category?: Category;

  @Expose({ name: 'sub_category_id' })
  subCategoryId: string;

  subCategory?: SubCategory;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}
