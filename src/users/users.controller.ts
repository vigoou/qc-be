import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { ResponseUserDto } from './dto/response-user.dto';
import { transformData } from '../common/transform-data';
import { Roles } from '../auth/role/roles.decorator';
import { Role } from '../enum/role.enum';
import { transformUserCreateInput } from './dto/mapping-user';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Roles([Role.ADMIN])
  @Post()
  create(@Body() req: CreateUserDto) {
    const createUser = transformUserCreateInput(req);
    const resUser = this.usersService.createUser(createUser);
    return transformData(ResponseUserDto, resUser);
  }

  @Get()
  getUserByUnit(@Query() query: any) {
    const userQuery: Prisma.UserWhereUniqueInput = {
      ...query,
    };
    return this.usersService.findOne(userQuery);
  }
}
