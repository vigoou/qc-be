import { Prisma } from '@prisma/client';
import { CreateBrandDto } from './create-brand.dto';

export function transformBrandCreateInput(
  data: CreateBrandDto,
): Prisma.BrandCreateInput {
  const createBrand: Prisma.BrandCreateInput = {
    id: data.id,
    name: data.name,
    code: data.code,
  };

  return createBrand;
}
