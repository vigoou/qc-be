import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService, PrismaService],
  exports: [BrandsService],
})
export class BrandsModule {}
