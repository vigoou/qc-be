import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Prisma } from '@prisma/client';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { transformData } from '../common/transform-data';
import { Public } from '../auth/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Post()
  async create(@Body() req: CreateCategoryDto) {
    const createCategory: Prisma.CategoryCreateInput = {
      id: req.id,
      name: req.name,
      nameVN: req.nameVN,
      code: req.code,
      status: req.status ?? true,
    };
    const resCategory =
      await this.categoriesService.createCategory(createCategory);
    return transformData(ResponseCategoryDto, resCategory);
  }

  @Public()
  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAll();
    return categories.map((category) =>
      transformData(ResponseCategoryDto, category),
    );
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoriesService.findById(id);
    return transformData(ResponseCategoryDto, category);
  }

  @Public()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: Partial<CreateCategoryDto>,
  ) {
    const updateCategory: Prisma.CategoryUpdateInput = {
      ...req,
    };
    const category = await this.categoriesService.updateCategory(
      id,
      updateCategory,
    );
    return transformData(ResponseCategoryDto, category);
  }

  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const category = await this.categoriesService.deleteCategory(id);
    return transformData(ResponseCategoryDto, category);
  }
}
