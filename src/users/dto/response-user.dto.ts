import { Role } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class ResponseUserDto {
  id: string;
  @Expose({ name: 'user_name' })
  userName?: string;
  email?: string;
  @Expose({ name: 'phone_number' })
  phoneNumber?: string;
  name?: string;
  role?: Role;
  @Expose({ name: 'created_at' })
  createdAt: Date;
  @Expose({ name: 'updated_at' })
  updatedAt: Date;
  @Exclude()
  password: string;
  @Expose({ name: 'role_id' })
  roleId: string;
}
