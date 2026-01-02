import { Prisma } from '@prisma/client';
import { CreateRoleDto } from './create-role.dto';

export function transformRoleCreateInput(
  data: CreateRoleDto,
): Prisma.RoleCreateInput {
  const createRole: Prisma.RoleCreateInput = {
    name: data.name,
  };

  return createRole;
}
