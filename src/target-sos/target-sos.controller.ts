import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTargetSOSDto } from './dto/create-target-sos.dto';
import { TargetSOSService } from './target-sos.service';
import { Prisma } from '@prisma/client';
import { ResponseTargetSOSDto } from './dto/response-target-sos.dto';
import { transformData } from '../common/transform-data';
import { Public } from '../auth/jwt-auth.guard';

@Controller('target-sos')
export class TargetSOSController {
  constructor(private readonly targetSOSService: TargetSOSService) {}

  @Public()
  @Post()
  async create(@Body() req: CreateTargetSOSDto) {
    const createTargetSOS: Prisma.TargetSOSCreateInput = {
      target: req.target,
      store: { connect: { id: req.storeId } },
      category: { connect: { id: req.categoryId } },
    };
    const resTargetSOS =
      await this.targetSOSService.createTargetSOS(createTargetSOS);
    return transformData(ResponseTargetSOSDto, resTargetSOS);
  }

  @Public()
  @Get()
  async findAll() {
    const targetSOSs = await this.targetSOSService.findAll();
    return targetSOSs.map((targetSOS) =>
      transformData(ResponseTargetSOSDto, targetSOS),
    );
  }

  @Public()
  @Get('by-composite-id')
  async findOne(
    @Query('storeId') storeId: string,
    @Query('categoryId') categoryId: string,
  ) {
    const targetSOS = await this.targetSOSService.findByCompositeId(
      storeId,
      categoryId,
    );
    return transformData(ResponseTargetSOSDto, targetSOS);
  }

  @Public()
  @Put()
  async update(
    @Query('storeId') storeId: string,
    @Query('categoryId') categoryId: string,
    @Body() req: Partial<CreateTargetSOSDto>,
  ) {
    const updateTargetSOS: Prisma.TargetSOSUpdateInput = {
      target: req.target,
    };
    const targetSOS = await this.targetSOSService.updateTargetSOS(
      storeId,
      categoryId,
      updateTargetSOS,
    );
    return transformData(ResponseTargetSOSDto, targetSOS);
  }

  @Public()
  @Delete()
  async remove(
    @Query('storeId') storeId: string,
    @Query('categoryId') categoryId: string,
  ) {
    const targetSOS = await this.targetSOSService.deleteTargetSOS(
      storeId,
      categoryId,
    );
    return transformData(ResponseTargetSOSDto, targetSOS);
  }
}
