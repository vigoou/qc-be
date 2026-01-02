import { Module } from '@nestjs/common';
import { OOLRulesController } from './ool-rules.controller';
import { OOLRulesService } from './ool-rules.service';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [OOLRulesController],
  providers: [OOLRulesService, PrismaService],
  exports: [OOLRulesService],
})
export class OOLRulesModule {}
