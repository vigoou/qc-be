import { Module } from '@nestjs/common';
import { SOSRulesController } from './sos-rules.controller';
import { SOSRulesService } from './sos-rules.service';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [SOSRulesController],
  providers: [SOSRulesService, PrismaService],
  exports: [SOSRulesService],
})
export class SOSRulesModule {}
