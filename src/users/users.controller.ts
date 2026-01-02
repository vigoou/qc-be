import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { ResponseUserDto } from './dto/response-user.dto';
import { transformData } from '../common/transform-data';
import { Roles } from '../auth/role/roles.decorator';
import { Role } from '../enum/role.enum';
import { transformUserCreateInput } from './dto/mapping-user';
import { Public } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  // @Roles([Role.ADMIN])
  @Public()
  @Post()
  async create(@Body() req: CreateUserDto) {
    console.log('Create User:', req);
    const createUser = transformUserCreateInput(req);
    const resUser = await this.usersService.createUser(createUser);
    return transformData(ResponseUserDto, resUser);
  }

  @Get()
  async getUserByUnit(@Query() query: any) {
    const userQuery: Prisma.UserWhereUniqueInput = {
      ...query,
    };
    const user = await this.usersService.findOne(userQuery);
    return transformData(ResponseUserDto, user);
  }
}
