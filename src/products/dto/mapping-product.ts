import { Prisma } from '@prisma/client';
import { CreateProductDto } from './create-product.dto';

export function transformProductCreateInput(
  data: CreateProductDto,
): Prisma.ProductCreateInput {
  const createProduct: Prisma.ProductCreateInput = {
    productCode: data.productCode,
    oldProductCode: data.oldProductCode,
    name: data.name,
    nameVN: data.nameVN,
    packageSize: data.packageSize,
    barcode: data.barcode,
    length: data.length,
    unit: data.unit,
    status: data.status ?? true,
    brand: { connect: { id: data.brandId } },
    category: { connect: { id: data.categoryId } },
    subCategory: { connect: { id: data.subCategoryId } },
  };

  return createProduct;
}
