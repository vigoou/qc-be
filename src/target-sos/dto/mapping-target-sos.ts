import { Prisma } from '@prisma/client';
import { CreateTargetSOSDto } from './create-target-sos.dto';

export function transformTargetSOSCreateInput(
  data: CreateTargetSOSDto,
): Prisma.TargetSOSCreateInput {
  const createTargetSOS: Prisma.TargetSOSCreateInput = {
    target: data.target,
    store: { connect: { id: data.storeId } },
    category: { connect: { id: data.categoryId } },
  };

  return createTargetSOS;
}
