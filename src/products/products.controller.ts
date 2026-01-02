import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';
import { ResponseProductDto } from './dto/response-product.dto';
import { transformData } from '../common/transform-data';
import { Public } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Post()
  async create(@Body() req: CreateProductDto) {
    const createProduct: Prisma.ProductCreateInput = {
      productCode: req.productCode,
      oldProductCode: req.oldProductCode,
      name: req.name,
      nameVN: req.nameVN,
      packageSize: req.packageSize,
      barcode: req.barcode,
      length: req.length,
      unit: req.unit,
      status: req.status ?? true,
      brand: { connect: { id: req.brandId } },
      category: { connect: { id: req.categoryId } },
      subCategory: { connect: { id: req.subCategoryId } },
    };
    const resProduct = await this.productsService.createProduct(createProduct);
    return transformData(ResponseProductDto, resProduct);
  }

  @Public()
  @Get()
  async findAll() {
    const products = await this.productsService.findAll();
    return products.map((product) =>
      transformData(ResponseProductDto, product),
    );
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findById(id);
    return transformData(ResponseProductDto, product);
  }

  @Public()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: Partial<CreateProductDto>,
  ) {
    const updateProduct: Prisma.ProductUpdateInput = {
      ...req,
      brand: req.brandId ? { connect: { id: req.brandId } } : undefined,
      category: req.categoryId
        ? { connect: { id: req.categoryId } }
        : undefined,
      subCategory: req.subCategoryId
        ? { connect: { id: req.subCategoryId } }
        : undefined,
    };
    const product = await this.productsService.updateProduct(id, updateProduct);
    return transformData(ResponseProductDto, product);
  }

  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productsService.deleteProduct(id);
    return transformData(ResponseProductDto, product);
  }
}
