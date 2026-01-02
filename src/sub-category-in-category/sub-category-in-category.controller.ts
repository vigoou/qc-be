import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateSubCategoryInCategoryDto } from './dto/create-sub-category-in-category.dto';
import { SubCategoryInCategoryService } from './sub-category-in-category.service';
import { Prisma } from '@prisma/client';
import { ResponseSubCategoryInCategoryDto } from './dto/response-sub-category-in-category.dto';
import { transformData } from '../common/transform-data';
import { Public } from '../auth/jwt-auth.guard';

@Controller('sub-category-in-category')
export class SubCategoryInCategoryController {
  constructor(
    private readonly subCategoryInCategoryService: SubCategoryInCategoryService,
  ) {}

  @Public()
  @Post()
  async create(@Body() req: CreateSubCategoryInCategoryDto) {
    const createData: Prisma.SubCategoryInCategoryCreateInput = {
      category: { connect: { id: req.categoryId } },
      subCategory: { connect: { id: req.subCategoryId } },
    };
    const result = await this.subCategoryInCategoryService.create(createData);
    return transformData(ResponseSubCategoryInCategoryDto, result);
  }

  @Public()
  @Get()
  async findAll() {
    const items = await this.subCategoryInCategoryService.findAll();
    return items.map((item) =>
      transformData(ResponseSubCategoryInCategoryDto, item),
    );
  }

  @Public()
  @Get('by-composite-id')
  async findOne(
    @Query('categoryId') categoryId: string,
    @Query('subCategoryId') subCategoryId: string,
  ) {
    const item = await this.subCategoryInCategoryService.findByCompositeId(
      categoryId,
      subCategoryId,
    );
    return transformData(ResponseSubCategoryInCategoryDto, item);
  }

  @Public()
  @Put()
  async update(
    @Query('categoryId') categoryId: string,
    @Query('subCategoryId') subCategoryId: string,
    @Body() req: Partial<CreateSubCategoryInCategoryDto>,
  ) {
    const updateData: Prisma.SubCategoryInCategoryUpdateInput = {};
    const item = await this.subCategoryInCategoryService.update(
      categoryId,
      subCategoryId,
      updateData,
    );
    return transformData(ResponseSubCategoryInCategoryDto, item);
  }

  @Public()
  @Delete()
  async remove(
    @Query('categoryId') categoryId: string,
    @Query('subCategoryId') subCategoryId: string,
  ) {
    const item = await this.subCategoryInCategoryService.delete(
      categoryId,
      subCategoryId,
    );
    return transformData(ResponseSubCategoryInCategoryDto, item);
  }
}
