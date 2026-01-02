import { Expose } from 'class-transformer';

export class ResponseCategoryDto {
  id: string;
  name: string;
  nameVN: string;
  code: string;
  status: boolean;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}
