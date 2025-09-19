import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { ResponseUserDto } from './dto/response-user.dto';
import { Encryption } from '../common/encryption';
import { transformData } from '../common/transform-data';

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

  async findOne(userQuery: Prisma.UserWhereUniqueInput): Promise<ResponseUserDto> {
    const user = await this.prisma.user.findUnique({
      where: userQuery,
      include: { role: true },
    });
    return transformData(ResponseUserDto, user);
  }

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    const createUser = {
      ...user,
      password: await new Encryption().encrypPass(user.password),
    };
    return this.prisma.user.create({ data: createUser });
  }

  async findById(userId: string): Promise<ResponseUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });
    return transformData(ResponseUserDto, user);
  }
}
