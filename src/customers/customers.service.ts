import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Customer } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    customerQuery: Prisma.CustomerWhereUniqueInput,
  ): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: customerQuery,
    });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany();
    return customers;
  }

  async createCustomer(
    customer: Prisma.CustomerCreateInput,
  ): Promise<Customer> {
    return this.prisma.customer.create({ data: customer });
  }

  async createCustomerIfNotExists(
    customer: Prisma.CustomerCreateInput,
  ): Promise<Customer> {
    // Check if customer already exists by code
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { code: customer.code },
    });

    if (existingCustomer) {
      console.log(`Customer already exists: ${customer.code}`);
      return existingCustomer;
    }

    // Create new customer if doesn't exist
    return this.prisma.customer.create({ data: customer });
  }

  async updateCustomer(
    id: string,
    customer: Prisma.CustomerUpdateInput,
  ): Promise<Customer> {
    return this.prisma.customer.update({
      where: { id },
      data: customer,
    });
  }

  async deleteCustomer(id: string): Promise<Customer> {
    return this.prisma.customer.delete({
      where: { id },
    });
  }

  async findById(customerId: string): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }
    return customer;
  }
}
