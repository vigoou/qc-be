import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { Prisma } from '@prisma/client';
import { ResponseRoleDto } from './dto/response-role.dto';
import { transformData } from '../common/transform-data';
import { Public } from '../auth/jwt-auth.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Public()
  @Post()
  async create(@Body() req: CreateRoleDto) {
    const createRole: Prisma.RoleCreateInput = {
      name: req.name,
    };
    const resRole = await this.rolesService.createRole(createRole);
    return transformData(ResponseRoleDto, resRole);
  }

  @Public()
  @Get()
  async findAll() {
    const roles = await this.rolesService.findAll();
    return roles.map((role) => transformData(ResponseRoleDto, role));
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const role = await this.rolesService.findById(id);
    return transformData(ResponseRoleDto, role);
  }

  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() req: Partial<CreateRoleDto>) {
    const updateRole: Prisma.RoleUpdateInput = {
      ...req,
    };
    const role = await this.rolesService.updateRole(id, updateRole);
    return transformData(ResponseRoleDto, role);
  }

  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const role = await this.rolesService.deleteRole(id);
    return transformData(ResponseRoleDto, role);
  }
}
