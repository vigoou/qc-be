import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSOSRuleDto } from './dto/create-sos-rule.dto';
import { SOSRulesService } from './sos-rules.service';
import { Prisma } from '@prisma/client';
import { ResponseSOSRuleDto } from './dto/response-sos-rule.dto';
import { transformData } from '../common/transform-data';
import { Public } from '../auth/jwt-auth.guard';

@Controller('sos-rules')
export class SOSRulesController {
  constructor(private readonly sosRulesService: SOSRulesService) {}

  @Public()
  @Post()
  async create(@Body() req: CreateSOSRuleDto) {
    const createSOSRule: Prisma.SOSRuleCreateInput = {
      ruleBig: req.ruleBig,
      ruleSmall: req.ruleSmall,
      note: req.note,
      category: { connect: { id: req.categoryId } },
      subCategory: { connect: { id: req.subCategoryId } },
      brand: { connect: { id: req.brandId } },
    };
    const resSOSRule = await this.sosRulesService.createSOSRule(createSOSRule);
    return transformData(ResponseSOSRuleDto, resSOSRule);
  }

  @Public()
  @Get()
  async findAll() {
    const sosRules = await this.sosRulesService.findAll();
    return sosRules.map((sosRule) =>
      transformData(ResponseSOSRuleDto, sosRule),
    );
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const sosRule = await this.sosRulesService.findById(id);
    return transformData(ResponseSOSRuleDto, sosRule);
  }

  @Public()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: Partial<CreateSOSRuleDto>,
  ) {
    const updateSOSRule: Prisma.SOSRuleUpdateInput = {
      ruleBig: req.ruleBig,
      ruleSmall: req.ruleSmall,
      note: req.note,
      category: req.categoryId
        ? { connect: { id: req.categoryId } }
        : undefined,
      subCategory: req.subCategoryId
        ? { connect: { id: req.subCategoryId } }
        : undefined,
      brand: req.brandId ? { connect: { id: req.brandId } } : undefined,
    };
    const sosRule = await this.sosRulesService.updateSOSRule(id, updateSOSRule);
    return transformData(ResponseSOSRuleDto, sosRule);
  }

  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const sosRule = await this.sosRulesService.deleteSOSRule(id);
    return transformData(ResponseSOSRuleDto, sosRule);
  }
}
