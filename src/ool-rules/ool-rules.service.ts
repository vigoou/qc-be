import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, OOLRule } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class OOLRulesService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    oolRuleQuery: Prisma.OOLRuleWhereUniqueInput,
  ): Promise<OOLRule> {
    const oolRule = await this.prisma.oOLRule.findUnique({
      where: oolRuleQuery,
    });
    if (!oolRule) {
      throw new NotFoundException('OOLRule not found');
    }
    return oolRule;
  }

  async findAll(): Promise<OOLRule[]> {
    return this.prisma.oOLRule.findMany();
  }

  async createOOLRule(oolRule: Prisma.OOLRuleCreateInput): Promise<OOLRule> {
    return this.prisma.oOLRule.create({ data: oolRule });
  }

  async updateOOLRule(
    id: string,
    oolRule: Prisma.OOLRuleUpdateInput,
  ): Promise<OOLRule> {
    return this.prisma.oOLRule.update({
      where: { id },
      data: oolRule,
    });
  }

  async deleteOOLRule(id: string): Promise<OOLRule> {
    return this.prisma.oOLRule.delete({
      where: { id },
    });
  }

  async findById(oolRuleId: string): Promise<OOLRule> {
    const oolRule = await this.prisma.oOLRule.findUnique({
      where: { id: oolRuleId },
    });
    if (!oolRule) {
      throw new NotFoundException(`OOLRule with ID ${oolRuleId} not found`);
    }
    return oolRule;
  }

  async createOOLRuleIfNotExists(
    oolRuleData: Prisma.OOLRuleCreateInput,
  ): Promise<OOLRule> {
    const existingOOLRule = await this.prisma.oOLRule.findUnique({
      where: { offCode: oolRuleData.offCode },
    });

    if (existingOOLRule) {
      return existingOOLRule;
    }

    return this.prisma.oOLRule.create({ data: oolRuleData });
  }
}
