import { Expose } from 'class-transformer';

export class ResponseSubCategoryDto {
  id: string;
  name: string;

  @Expose({ name: 'name_vn' })
  nameVN: string;

  code: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}
