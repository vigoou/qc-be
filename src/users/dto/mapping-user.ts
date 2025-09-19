import { Prisma } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';

export function transformUserCreateInput(
  data: CreateUserDto,
): Prisma.UserCreateInput {
  const currentTime = new Date();
  const createUser: Prisma.UserCreateInput = {
    user_name: data.userName || '',
    email: data.email || '',
    phone_number: data.phoneNumber || '',
    name: data.name,
    password: data.password || '',
    created_at: currentTime,
    updated_at: currentTime,
    role: {
      connectOrCreate: {
        where: {
          name: data.role,
        },
        create: {
          name: data.role || '',
          created_at: currentTime,
          updated_at: currentTime,
        },
      },
    },
  };

  return createUser;
}
