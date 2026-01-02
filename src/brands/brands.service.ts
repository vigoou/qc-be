import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Brand } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async findOne(brandQuery: Prisma.BrandWhereUniqueInput): Promise<Brand> {
    const brand = await this.prisma.brand.findUnique({
      where: brandQuery,
    });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }

  async findAll(): Promise<Brand[]> {
    return this.prisma.brand.findMany();
  }

  async createBrand(brand: Prisma.BrandCreateInput): Promise<Brand> {
    return this.prisma.brand.create({ data: brand });
  }

  async updateBrand(
    id: string,
    brand: Prisma.BrandUpdateInput,
  ): Promise<Brand> {
    return this.prisma.brand.update({
      where: { id },
      data: brand,
    });
  }

  async deleteBrand(id: string): Promise<Brand> {
    return this.prisma.brand.delete({
      where: { id },
    });
  }

  async findById(brandId: string): Promise<Brand> {
    const brand = await this.prisma.brand.findUnique({
      where: { id: brandId },
    });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${brandId} not found`);
    }
    return brand;
  }

  async findByCode(code: string): Promise<Brand | null> {
    return this.prisma.brand.findUnique({
      where: { code },
    });
  }

  async createBrandIfNotExists(
    brandData: Prisma.BrandCreateInput,
  ): Promise<Brand> {
    const existingBrand = await this.prisma.brand.findFirst({
      where: {
        OR: [{ id: brandData.id }, { code: brandData.code }],
      },
    });

    if (existingBrand) {
      return existingBrand;
    }

    return this.prisma.brand.create({ data: brandData });
  }
}
