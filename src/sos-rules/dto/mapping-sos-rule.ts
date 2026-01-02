import { Prisma } from '@prisma/client';
import { CreateSOSRuleDto } from './create-sos-rule.dto';

export function transformSOSRuleCreateInput(
  data: CreateSOSRuleDto,
): Prisma.SOSRuleCreateInput {
  const createSOSRule: Prisma.SOSRuleCreateInput = {
    ruleBig: data.ruleBig,
    ruleSmall: data.ruleSmall,
    note: data.note,
    category: { connect: { id: data.categoryId } },
    subCategory: { connect: { id: data.subCategoryId } },
    brand: { connect: { id: data.brandId } },
  };

  return createSOSRule;
}
