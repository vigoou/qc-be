import { Expose } from 'class-transformer';

export class ResponseCustomerDto {
  id: string;
  name: string;
  code: string;
  ka: string;
  channel: string;
  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}
