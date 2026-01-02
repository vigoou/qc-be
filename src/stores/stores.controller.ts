import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoresService } from './stores.service';
import { Prisma } from '@prisma/client';
import { ResponseStoreDto } from './dto/response-store.dto';
import { transformData } from '../common/transform-data';
import { Public } from '../auth/jwt-auth.guard';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Public()
  @Post()
  async create(@Body() req: CreateStoreDto) {
    const createStore: Prisma.StoreCreateInput = {
      id: req.id,
      name: req.name,
      essStoreCode: req.essStoreCode,
      typeCode: req.typeCode,
      type: req.type,
      formatType: req.formatType,
      address: req.address,
      status: req.status,
      frequency: req.frequency,
      auditTime: req.auditTime,
      region: req.region,
      province: req.province,
      district: req.district,
      ward: req.ward,
      latitude: req.latitude,
      longitude: req.longitude,
      supervisor: { connect: { id: req.supervisorId } },
      saleRep: { connect: { id: req.saleRepId } },
      sip: { connect: { id: req.sipId } },
      auditors: { connect: { id: req.auditorsId } },
      customers: { connect: { id: req.customerId } },
    };
    const resStore = await this.storesService.createStore(createStore);
    return transformData(ResponseStoreDto, resStore);
  }

  @Public()
  @Get()
  async findAll() {
    const stores = await this.storesService.findAll();
    return stores.map((store) => transformData(ResponseStoreDto, store));
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const store = await this.storesService.findById(id);
    return transformData(ResponseStoreDto, store);
  }

  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() req: Partial<CreateStoreDto>) {
    const updateStore: Prisma.StoreUpdateInput = {
      ...req,
      supervisor: req.supervisorId
        ? { connect: { id: req.supervisorId } }
        : undefined,
      saleRep: req.saleRepId ? { connect: { id: req.saleRepId } } : undefined,
      sip: req.sipId ? { connect: { id: req.sipId } } : undefined,
      auditors: req.auditorsId
        ? { connect: { id: req.auditorsId } }
        : undefined,
      customers: req.customerId
        ? { connect: { id: req.customerId } }
        : undefined,
    };
    const store = await this.storesService.updateStore(id, updateStore);
    return transformData(ResponseStoreDto, store);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.deleteStore(id);
  }
}
