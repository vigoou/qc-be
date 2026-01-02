import { Injectable } from '@nestjs/common';
import { Prisma, Store } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  async findOne(storeQuery: Prisma.StoreWhereUniqueInput): Promise<Store> {
    const store = await this.prisma.store.findUnique({
      where: storeQuery,
      include: {
        supervisor: true,
        saleRep: true,
        sip: true,
        auditors: true,
        customers: true,
      },
    });
    if (!store) {
      throw new Error('Store not found');
    }
    return store;
  }

  async findAll(): Promise<Store[]> {
    const stores = await this.prisma.store.findMany({
      include: {
        supervisor: true,
        saleRep: true,
        sip: true,
        auditors: true,
        customers: true,
      },
    });
    return stores;
  }

  async createStore(store: Prisma.StoreCreateInput): Promise<Store> {
    return this.prisma.store.create({ data: store });
  }

  async updateStore(
    id: string,
    store: Prisma.StoreUpdateInput,
  ): Promise<Store> {
    return this.prisma.store.update({
      where: { id },
      data: store,
    });
  }

  async deleteStore(id: string): Promise<Store> {
    return this.prisma.store.delete({
      where: { id },
    });
  }

  async findById(storeId: string): Promise<Store> {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
      include: {
        supervisor: true,
        saleRep: true,
        sip: true,
        auditors: true,
        customers: true,
      },
    });
    if (!store) {
      throw new Error(`Store with ID ${storeId} not found`);
    }
    return store;
  }

  async checkStoreExists(storeId: string): Promise<boolean> {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
    });
    return !!store;
  }

  async createStoreIfNotExists(
    storeData: Prisma.StoreCreateInput,
  ): Promise<Store> {
    const existingStore = await this.prisma.store.findUnique({
      where: { essStoreCode: storeData.essStoreCode },
    });

    if (existingStore) {
      return existingStore;
    }

    return this.prisma.store.create({ data: storeData });
  }
}
