import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { BrandsService } from './brands.service';
import { Prisma } from '@prisma/client';
import { ResponseBrandDto } from './dto/response-brand.dto';
import { transformData } from '../common/transform-data';
import { Public } from '../auth/jwt-auth.guard';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Public()
  @Post()
  async create(@Body() req: CreateBrandDto) {
    const createBrand: Prisma.BrandCreateInput = {
      id: req.id,
      name: req.name,
      code: req.code,
    };
    const resBrand = await this.brandsService.createBrand(createBrand);
    return transformData(ResponseBrandDto, resBrand);
  }

  @Public()
  @Get()
  async findAll() {
    const brands = await this.brandsService.findAll();
    return brands.map((brand) => transformData(ResponseBrandDto, brand));
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const brand = await this.brandsService.findById(id);
    return transformData(ResponseBrandDto, brand);
  }

  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() req: Partial<CreateBrandDto>) {
    const updateBrand: Prisma.BrandUpdateInput = {
      ...req,
    };
    const brand = await this.brandsService.updateBrand(id, updateBrand);
    return transformData(ResponseBrandDto, brand);
  }

  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const brand = await this.brandsService.deleteBrand(id);
    return transformData(ResponseBrandDto, brand);
  }
}
