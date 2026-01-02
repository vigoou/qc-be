import { Expose } from 'class-transformer';
import { Category, SubCategory, Brand } from '@prisma/client';

export class ResponseSOSRuleDto {
  id: string;

  @Expose({ name: 'rule_big' })
  ruleBig: string;

  @Expose({ name: 'rule_small' })
  ruleSmall: string;

  note?: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;

  @Expose({ name: 'category_id' })
  categoryId: string;

  category?: Category;

  @Expose({ name: 'sub_category_id' })
  subCategoryId: string;

  subCategory?: SubCategory;

  @Expose({ name: 'brand_id' })
  brandId: string;

  brand?: Brand;
}
