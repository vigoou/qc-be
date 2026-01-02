import { Prisma } from '@prisma/client';
import { CreateStoreDto } from './create-store.dto';

export function transformStoreCreateInput(
  data: CreateStoreDto,
): Prisma.StoreCreateInput {
  const createStore: Prisma.StoreCreateInput = {
    id: data.id,
    name: data.name,
    essStoreCode: data.essStoreCode,
    typeCode: data.typeCode,
    type: data.type,
    formatType: data.formatType,
    address: data.address,
    status: data.status,
    frequency: data.frequency,
    auditTime: data.auditTime,
    region: data.region,
    province: data.province,
    district: data.district,
    ward: data.ward,
    latitude: data.latitude,
    longitude: data.longitude,
    supervisor: { connect: { id: data.supervisorId } },
    saleRep: { connect: { id: data.saleRepId } },
    sip: { connect: { id: data.sipId } },
    auditors: { connect: { id: data.auditorsId } },
    customers: { connect: { id: data.customerId } },
  };

  return createStore;
}
