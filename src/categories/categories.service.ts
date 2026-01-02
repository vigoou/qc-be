import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Category } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    categoryQuery: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: categoryQuery,
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async createCategory(
    category: Prisma.CategoryCreateInput,
  ): Promise<Category> {
    return this.prisma.category.create({ data: category });
  }

  async updateCategory(
    id: string,
    category: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: category,
    });
  }

  async deleteCategory(id: string): Promise<Category> {
    return this.prisma.category.delete({
      where: { id },
    });
  }

  async findById(categoryId: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    return category;
  }

  async findByCode(categoryCode: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { code: categoryCode },
    });
    return category;
  }

  async createCategoryIfNotExists(
    categoryData: Prisma.CategoryCreateInput,
  ): Promise<Category> {
    const existingCategory = await this.prisma.category.findUnique({
      where: { code: categoryData.code },
    });

    if (existingCategory) {
      return existingCategory;
    }

    return this.prisma.category.create({ data: categoryData });
  }
}
