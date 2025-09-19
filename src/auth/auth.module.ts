import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';
import { PrismaService } from '../common/prisma.service';

@Module({
  imports: [UserModule],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
