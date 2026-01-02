import { Expose } from 'class-transformer';
import { Brand, Category, SubCategory } from '@prisma/client';

export class ResponseProductDto {
  id: string;

  @Expose({ name: 'product_code' })
  productCode: string;

  @Expose({ name: 'old_product_code' })
  oldProductCode?: string;

  name: string;

  @Expose({ name: 'name_vn' })
  nameVN: string;

  @Expose({ name: 'package_size' })
  packageSize: string;

  barcode: string;
  length: number;
  unit: string;
  status: boolean;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;

  @Expose({ name: 'brand_id' })
  brandId: string;

  brand?: Brand;

  @Expose({ name: 'category_id' })
  categoryId: string;

  category?: Category;

  @Expose({ name: 'sub_category_id' })
  subCategoryId: string;

  subCategory?: SubCategory;
}
