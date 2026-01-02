import { Prisma } from '@prisma/client';
import { CreateCustomerDto } from './create-customer.dto';

export function transformCustomerCreateInput(
  data: CreateCustomerDto,
): Prisma.CustomerCreateInput {
  const createCustomer: Prisma.CustomerCreateInput = {
    name: data.name,
    code: data.code,
    ka: data.ka,
    channel: data.channel,
  };

  return createCustomer;
}
