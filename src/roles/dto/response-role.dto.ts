import { Expose } from 'class-transformer';

export class ResponseRoleDto {
  id: string;
  name: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}
