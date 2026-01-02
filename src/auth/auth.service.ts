import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Prisma } from '@prisma/client';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { Encryption } from '../common/encryption';
import { transformData } from '../common/transform-data';
import { AuthenticationException } from '../exception/authentication.exception';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    userName: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const query: Prisma.UserWhereUniqueInput = { userName: userName };
    const user = await this.usersService.findByUserName(query);
    if (!user) {
      throw new AuthenticationException('User not found');
    }
    if (!(await new Encryption().checkPassword(pass, user?.password))) {
      throw new AuthenticationException('Invalid password');
    }
    const resUser = transformData(ResponseUserDto, user);
    const payload = {
      id: resUser.id,
      username: resUser.userName,
      role: resUser.role?.name,
    };
    const userResponse = transformData(ResponseUserDto, user);
    return {
      ...userResponse,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
