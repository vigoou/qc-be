import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, SOSRule } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class SOSRulesService {
  constructor(private prisma: PrismaService) {}

  async findOne(sosRuleQuery: Prisma.SOSRuleWhereUniqueInput): Promise<any> {
    const sosRule = await this.prisma.sOSRule.findUnique({
      where: sosRuleQuery,
      include: {
        category: true,
        subCategory: true,
        brand: true,
      },
    });
    if (!sosRule) {
      throw new NotFoundException('SOSRule not found');
    }
    return sosRule;
  }

  async findAll(): Promise<any[]> {
    return this.prisma.sOSRule.findMany({
      include: {
        category: true,
        subCategory: true,
        brand: true,
      },
    });
  }

  async createSOSRule(sosRule: Prisma.SOSRuleCreateInput): Promise<SOSRule> {
    return this.prisma.sOSRule.create({ data: sosRule });
  }

  async updateSOSRule(
    id: string,
    sosRule: Prisma.SOSRuleUpdateInput,
  ): Promise<SOSRule> {
    return this.prisma.sOSRule.update({
      where: { id },
      data: sosRule,
    });
  }

  async deleteSOSRule(id: string): Promise<SOSRule> {
    return this.prisma.sOSRule.delete({
      where: { id },
    });
  }

  async findById(sosRuleId: string): Promise<any> {
    const sosRule = await this.prisma.sOSRule.findUnique({
      where: { id: sosRuleId },
      include: {
        category: true,
        subCategory: true,
        brand: true,
      },
    });
    if (!sosRule) {
      throw new NotFoundException(`SOSRule with ID ${sosRuleId} not found`);
    }
    return sosRule;
  }

  async createSOSRuleIfNotExists(
    sosRuleData: Prisma.SOSRuleCreateInput,
    categoryId,
    subCategoryId,
    brandId,
  ): Promise<SOSRule> {
    const existingSOSRule = await this.prisma.sOSRule.findFirst({
      where: {
        categoryId,
        subCategoryId,
        brandId,
      },
    });

    if (existingSOSRule) {
      return existingSOSRule;
    }

    return this.prisma.sOSRule.create({ data: sosRuleData });
  }
}
