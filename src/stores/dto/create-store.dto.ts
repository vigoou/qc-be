import { IsNotEmpty, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  essStoreCode: string;

  @IsNotEmpty()
  typeCode: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  formatType: string;

  @IsNotEmpty()
  address: string;

  @IsBoolean()
  status: boolean;

  @IsInt()
  frequency: number;

  @IsInt()
  auditTime: number;

  @IsNotEmpty()
  region: string;

  @IsNotEmpty()
  province: string;

  @IsNotEmpty()
  district: string;

  @IsNotEmpty()
  ward: string;

  @IsNotEmpty()
  addressDetail: string;

  @IsNotEmpty()
  latitude: string;

  @IsNotEmpty()
  longitude: string;

  @IsNotEmpty()
  supervisorId: string;

  @IsNotEmpty()
  saleRepId: string;

  @IsNotEmpty()
  sipId: string;

  @IsNotEmpty()
  auditorsId: string;

  @IsNotEmpty()
  customerId: string;
}
