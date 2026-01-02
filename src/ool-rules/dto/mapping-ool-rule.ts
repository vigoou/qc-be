import { Prisma } from '@prisma/client';
import { CreateOOLRuleDto } from './create-ool-rule.dto';

export function transformOOLRuleCreateInput(
  data: CreateOOLRuleDto,
): Prisma.OOLRuleCreateInput {
  const createOOLRule: Prisma.OOLRuleCreateInput = {
    offCode: data.offCode,
    offName: data.offName,
    offNameVN: data.offNameVN,
    ruleBig: data.ruleBig,
    ruleSmall: data.ruleSmall,
    note: data.note,
  };

  return createOOLRule;
}
