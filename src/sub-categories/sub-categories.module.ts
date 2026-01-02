import { Module } from '@nestjs/common';
import { SubCategoriesController } from './sub-categories.controller';
import { SubCategoriesService } from './sub-categories.service';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService, PrismaService],
  exports: [SubCategoriesService],
})
export class SubCategoriesModule {}
