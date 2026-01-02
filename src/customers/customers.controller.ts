import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomersService } from './customers.service';
import { Prisma } from '@prisma/client';
import { ResponseCustomerDto } from './dto/response-customer.dto';
import { transformData } from '../common/transform-data';
import { Public } from '../auth/jwt-auth.guard';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Public()
  @Post()
  async create(@Body() req: CreateCustomerDto) {
    const createCustomer: Prisma.CustomerCreateInput = {
      name: req.name,
      code: req.code,
      ka: req.ka,
      channel: req.channel,
    };
    const resCustomer =
      await this.customersService.createCustomer(createCustomer);
    return transformData(ResponseCustomerDto, resCustomer);
  }

  @Public()
  @Get()
  async findAll() {
    const customers = await this.customersService.findAll();
    return customers.map((customer) =>
      transformData(ResponseCustomerDto, customer),
    );
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const customer = await this.customersService.findById(id);
    return transformData(ResponseCustomerDto, customer);
  }

  @Public()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: Partial<CreateCustomerDto>,
  ) {
    const updateCustomer: Prisma.CustomerUpdateInput = {
      ...req,
    };
    const customer = await this.customersService.updateCustomer(
      id,
      updateCustomer,
    );
    return transformData(ResponseCustomerDto, customer);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.deleteCustomer(id);
  }
}
