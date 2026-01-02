import { Prisma } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';

export function transformUserCreateInput(
  data: CreateUserDto,
): Prisma.UserCreateInput {
  const currentTime = new Date();
  const createUser: Prisma.UserCreateInput = {
    userName: data.userName || '',
    email: data.email || '',
    phoneNumber: data.phoneNumber || '',
    name: data.name,
    password: data.password || '',
    createdAt: currentTime,
    updatedAt: currentTime,
    role: {
      connectOrCreate: {
        where: {
          name: data.role,
        },
        create: {
          name: data.role || '',
          createdAt: currentTime,
          updatedAt: currentTime,
        },
      },
    },
  };

  return createUser;
}
