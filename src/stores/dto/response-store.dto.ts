import { Expose } from 'class-transformer';
import { Customer, User } from '@prisma/client';

export class ResponseStoreDto {
  id: string;
  name: string;

  @Expose({ name: 'ess_store_code' })
  essStoreCode: string;

  @Expose({ name: 'type_code' })
  typeCode: string;

  type: string;

  @Expose({ name: 'format_type' })
  formatType: string;

  address: string;
  status: boolean;
  frequency: number;

  @Expose({ name: 'audit_time' })
  auditTime: number;

  region: string;
  province: string;
  district: string;
  ward: string;

  @Expose({ name: 'address_detail' })
  addressDetail: string;

  latitude: string;
  longitude: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;

  @Expose({ name: 'supervisor_id' })
  supervisorId: string;

  supervisor?: User;

  @Expose({ name: 'sale_rep_id' })
  saleRepId: string;

  saleRep?: User;

  @Expose({ name: 'sip_id' })
  sipId: string;

  sip?: User;

  @Expose({ name: 'auditors_id' })
  auditorsId: string;

  auditors?: User;

  @Expose({ name: 'customer_id' })
  customerId: string;

  customers?: Customer;
}
