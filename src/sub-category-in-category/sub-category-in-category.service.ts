import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, SubCategoryInCategory } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class SubCategoryInCategoryService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    query: Prisma.SubCategoryInCategoryWhereUniqueInput,
  ): Promise<any> {
    const result = await this.prisma.subCategoryInCategory.findUnique({
      where: query,
      include: {
        category: true,
        subCategory: true,
      },
    });
    if (!result) {
      throw new NotFoundException('SubCategoryInCategory not found');
    }
    return result;
  }

  async findAll(): Promise<any[]> {
    return this.prisma.subCategoryInCategory.findMany({
      include: {
        category: true,
        subCategory: true,
      },
    });
  }

  async create(
    data: Prisma.SubCategoryInCategoryCreateInput,
  ): Promise<SubCategoryInCategory> {
    return this.prisma.subCategoryInCategory.create({ data });
  }

  async update(
    categoryId: string,
    subCategoryId: string,
    data: Prisma.SubCategoryInCategoryUpdateInput,
  ): Promise<SubCategoryInCategory> {
    return this.prisma.subCategoryInCategory.update({
      where: {
        categoryId_subCategoryId: {
          categoryId,
          subCategoryId,
        },
      },
      data,
    });
  }

  async delete(
    categoryId: string,
    subCategoryId: string,
  ): Promise<SubCategoryInCategory> {
    return this.prisma.subCategoryInCategory.delete({
      where: {
        categoryId_subCategoryId: {
          categoryId,
          subCategoryId,
        },
      },
    });
  }

  async findByCompositeId(
    categoryId: string,
    subCategoryId: string,
  ): Promise<any> {
    const result = await this.prisma.subCategoryInCategory.findUnique({
      where: {
        categoryId_subCategoryId: {
          categoryId,
          subCategoryId,
        },
      },
      include: {
        category: true,
        subCategory: true,
      },
    });
    if (!result) {
      throw new NotFoundException(
        `SubCategoryInCategory with categoryId ${categoryId} and subCategoryId ${subCategoryId} not found`,
      );
    }
    return result;
  }
}
