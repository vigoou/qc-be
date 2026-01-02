import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOOLRuleDto } from './dto/create-ool-rule.dto';
import { OOLRulesService } from './ool-rules.service';
import { Prisma } from '@prisma/client';
import { ResponseOOLRuleDto } from './dto/response-ool-rule.dto';
import { transformData } from '../common/transform-data';
import { Public } from '../auth/jwt-auth.guard';

@Controller('ool-rules')
export class OOLRulesController {
  constructor(private readonly oolRulesService: OOLRulesService) {}

  @Public()
  @Post()
  async create(@Body() req: CreateOOLRuleDto) {
    const createOOLRule: Prisma.OOLRuleCreateInput = {
      offCode: req.offCode,
      offName: req.offName,
      offNameVN: req.offNameVN,
      ruleBig: req.ruleBig,
      ruleSmall: req.ruleSmall,
      note: req.note,
    };
    const resOOLRule = await this.oolRulesService.createOOLRule(createOOLRule);
    return transformData(ResponseOOLRuleDto, resOOLRule);
  }

  @Public()
  @Get()
  async findAll() {
    const oolRules = await this.oolRulesService.findAll();
    return oolRules.map((oolRule) =>
      transformData(ResponseOOLRuleDto, oolRule),
    );
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const oolRule = await this.oolRulesService.findById(id);
    return transformData(ResponseOOLRuleDto, oolRule);
  }

  @Public()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: Partial<CreateOOLRuleDto>,
  ) {
    const updateOOLRule: Prisma.OOLRuleUpdateInput = {
      ...req,
    };
    const oolRule = await this.oolRulesService.updateOOLRule(id, updateOOLRule);
    return transformData(ResponseOOLRuleDto, oolRule);
  }

  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const oolRule = await this.oolRulesService.deleteOOLRule(id);
    return transformData(ResponseOOLRuleDto, oolRule);
  }
}
