import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findOne(productQuery: Prisma.ProductWhereUniqueInput): Promise<any> {
    const product = await this.prisma.product.findUnique({
      where: productQuery,
      include: {
        brand: true,
        category: true,
        subCategory: true,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findAll(): Promise<any[]> {
    return this.prisma.product.findMany({
      include: {
        brand: true,
        category: true,
        subCategory: true,
      },
    });
  }

  async createProduct(product: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data: product });
  }

  async updateProduct(
    id: string,
    product: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: product,
    });
  }

  async deleteProduct(id: string): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async findById(productId: string): Promise<any> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        brand: true,
        category: true,
        subCategory: true,
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }

  async createProductIfNotExists(
    productData: Prisma.ProductCreateInput,
  ): Promise<Product> {
    const existingProduct = await this.prisma.product.findUnique({
      where: { productCode: productData.productCode },
    });

    if (existingProduct) {
      return existingProduct;
    }

    return this.prisma.product.create({ data: productData });
  }
}
