import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async findOne(roleQuery: Prisma.RoleWhereUniqueInput): Promise<Role> {
    const role = await this.prisma.role.findUnique({
      where: roleQuery,
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  async createRole(role: Prisma.RoleCreateInput): Promise<Role> {
    return this.prisma.role.create({ data: role });
  }

  async updateRole(id: string, role: Prisma.RoleUpdateInput): Promise<Role> {
    return this.prisma.role.update({
      where: { id },
      data: role,
    });
  }

  async deleteRole(id: string): Promise<Role> {
    return this.prisma.role.delete({
      where: { id },
    });
  }

  async findById(roleId: string): Promise<Role> {
    const role = await this.prisma.role.findUnique({
      where: { id: roleId },
    });
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }
    return role;
  }
}
