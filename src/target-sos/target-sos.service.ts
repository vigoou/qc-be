import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, TargetSOS } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class TargetSOSService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    targetSOSQuery: Prisma.TargetSOSWhereUniqueInput,
  ): Promise<any> {
    const targetSOS = await this.prisma.targetSOS.findUnique({
      where: targetSOSQuery,
      include: {
        store: true,
        category: true,
      },
    });
    if (!targetSOS) {
      throw new NotFoundException('TargetSOS not found');
    }
    return targetSOS;
  }

  async findAll(): Promise<any[]> {
    return this.prisma.targetSOS.findMany({
      include: {
        store: true,
        category: true,
      },
    });
  }

  async createTargetSOS(
    targetSOS: Prisma.TargetSOSCreateInput,
  ): Promise<TargetSOS> {
    return this.prisma.targetSOS.create({ data: targetSOS });
  }

  async updateTargetSOS(
    storeId: string,
    categoryId: string,
    targetSOS: Prisma.TargetSOSUpdateInput,
  ): Promise<TargetSOS> {
    return this.prisma.targetSOS.update({
      where: {
        storeId_categoryId: {
          storeId,
          categoryId,
        },
      },
      data: targetSOS,
    });
  }

  async deleteTargetSOS(
    storeId: string,
    categoryId: string,
  ): Promise<TargetSOS> {
    return this.prisma.targetSOS.delete({
      where: {
        storeId_categoryId: {
          storeId,
          categoryId,
        },
      },
    });
  }

  async findByCompositeId(storeId: string, categoryId: string): Promise<any> {
    const targetSOS = await this.prisma.targetSOS.findUnique({
      where: {
        storeId_categoryId: {
          storeId,
          categoryId,
        },
      },
      include: {
        store: true,
        category: true,
      },
    });
    if (!targetSOS) {
      throw new NotFoundException(
        `TargetSOS with storeId ${storeId} and categoryId ${categoryId} not found`,
      );
    }
    return targetSOS;
  }

  async createOrUpdateTargetSOSIfNotExists(
    targetSOSData: Prisma.TargetSOSCreateInput,
    storeId,
    categoryId,
  ): Promise<TargetSOS> {
    if (storeId && categoryId) {
      const existingTargetSOS = await this.prisma.targetSOS.findUnique({
        where: {
          storeId_categoryId: {
            storeId,
            categoryId,
          },
        },
      });

      if (existingTargetSOS) {
        return this.prisma.targetSOS.update({
          where: {
            storeId_categoryId: {
              storeId,
              categoryId,
            },
          },
          data: {
            target: targetSOSData.target,
          },
        });
      }
    }

    return this.prisma.targetSOS.create({ data: targetSOSData });
  }
}
