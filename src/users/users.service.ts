import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { Encryption } from '../common/encryption';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByUserName(userQuery: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: userQuery,
      include: { role: true },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findOne(userQuery: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: userQuery,
      include: { role: true },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    const createUser = {
      ...user,
      password: await new Encryption().encrypPass(user.password),
    };
    return this.prisma.user.create({ data: createUser });
  }

  async createUserIfNotExists(user: Prisma.UserCreateInput): Promise<User> {
    // Check if user already exists by userName
    const existingUser = await this.prisma.user.findUnique({
      where: { userName: user.userName },
    });

    if (existingUser) {
      console.log(`User already exists: ${user.userName}`);
      return existingUser;
    }

    // Create new user if doesn't exist
    const createUser = {
      ...user,
      password: await new Encryption().encrypPass(user.password),
    };
    console.log(`Creating user: ${user.userName}`);
    return this.prisma.user.create({ data: createUser });
  }

  async findById(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
