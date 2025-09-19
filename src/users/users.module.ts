import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UserModule {}
