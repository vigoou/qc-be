import { Expose } from 'class-transformer';

export class ResponseBrandDto {
  id: string;
  name: string;
  code: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}
