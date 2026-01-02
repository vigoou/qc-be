import { Module } from '@nestjs/common';
import { SubCategoryInCategoryController } from './sub-category-in-category.controller';
import { SubCategoryInCategoryService } from './sub-category-in-category.service';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [SubCategoryInCategoryController],
  providers: [SubCategoryInCategoryService, PrismaService],
  exports: [SubCategoryInCategoryService],
})
export class SubCategoryInCategoryModule {}
