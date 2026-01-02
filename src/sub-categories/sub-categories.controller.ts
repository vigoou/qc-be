import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { SubCategoriesService } from './sub-categories.service';
import { Prisma } from '@prisma/client';
import { ResponseSubCategoryDto } from './dto/response-sub-category.dto';
import { transformData } from '../common/transform-data';
import { Public } from '../auth/jwt-auth.guard';

@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Public()
  @Post()
  async create(@Body() req: CreateSubCategoryDto) {
    const createSubCategory: Prisma.SubCategoryCreateInput = {
      name: req.name,
      nameVN: req.nameVN,
      code: req.code,
    };
    const resSubCategory =
      await this.subCategoriesService.createSubCategory(createSubCategory);
    return transformData(ResponseSubCategoryDto, resSubCategory);
  }

  @Public()
  @Get()
  async findAll() {
    const subCategories = await this.subCategoriesService.findAll();
    return subCategories.map((subCategory) =>
      transformData(ResponseSubCategoryDto, subCategory),
    );
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const subCategory = await this.subCategoriesService.findById(id);
    return transformData(ResponseSubCategoryDto, subCategory);
  }

  @Public()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: Partial<CreateSubCategoryDto>,
  ) {
    const updateSubCategory: Prisma.SubCategoryUpdateInput = {
      ...req,
    };
    const subCategory = await this.subCategoriesService.updateSubCategory(
      id,
      updateSubCategory,
    );
    return transformData(ResponseSubCategoryDto, subCategory);
  }

  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const subCategory = await this.subCategoriesService.deleteSubCategory(id);
    return transformData(ResponseSubCategoryDto, subCategory);
  }
}
