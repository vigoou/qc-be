import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  @IsOptional()
  phoneNumber?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  role: string;
}
