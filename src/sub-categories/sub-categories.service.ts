import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, SubCategory } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class SubCategoriesService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    subCategoryQuery: Prisma.SubCategoryWhereUniqueInput,
  ): Promise<SubCategory> {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: subCategoryQuery,
    });
    if (!subCategory) {
      throw new NotFoundException('SubCategory not found');
    }
    return subCategory;
  }

  async findAll(): Promise<SubCategory[]> {
    return this.prisma.subCategory.findMany();
  }

  async createSubCategory(
    subCategory: Prisma.SubCategoryCreateInput,
  ): Promise<SubCategory> {
    return this.prisma.subCategory.create({ data: subCategory });
  }

  async updateSubCategory(
    id: string,
    subCategory: Prisma.SubCategoryUpdateInput,
  ): Promise<SubCategory> {
    return this.prisma.subCategory.update({
      where: { id },
      data: subCategory,
    });
  }

  async deleteSubCategory(id: string): Promise<SubCategory> {
    return this.prisma.subCategory.delete({
      where: { id },
    });
  }

  async findById(subCategoryId: string): Promise<SubCategory> {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id: subCategoryId },
    });
    if (!subCategory) {
      throw new NotFoundException(
        `SubCategory with ID ${subCategoryId} not found`,
      );
    }
    return subCategory;
  }

  async findByCode(code: string): Promise<SubCategory | null> {
    return this.prisma.subCategory.findUnique({
      where: { code },
    });
  }

  async createSubCategoryIfNotExists(
    subCategoryData: Prisma.SubCategoryCreateInput,
  ): Promise<SubCategory> {
    const existingSubCategory = await this.prisma.subCategory.findUnique({
      where: { code: subCategoryData.code },
    });

    if (existingSubCategory) {
      return existingSubCategory;
    }

    return this.prisma.subCategory.create({ data: subCategoryData });
  }
}
