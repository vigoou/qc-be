import { Expose } from 'class-transformer';
import { Store, Category } from '@prisma/client';

export class ResponseTargetSOSDto {
  @Expose({ name: 'store_id' })
  storeId: string;

  store?: Store;

  @Expose({ name: 'category_id' })
  categoryId: string;

  category?: Category;

  target: number;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}
