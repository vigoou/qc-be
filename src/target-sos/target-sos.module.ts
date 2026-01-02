import { Module } from '@nestjs/common';
import { TargetSOSController } from './target-sos.controller';
import { TargetSOSService } from './target-sos.service';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [TargetSOSController],
  providers: [TargetSOSService, PrismaService],
  exports: [TargetSOSService],
})
export class TargetSOSModule {}
