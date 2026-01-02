import { IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateOOLRuleDto {
  @IsNotEmpty()
  offCode: string;

  @IsNotEmpty()
  offName: string;

  @IsNotEmpty()
  offNameVN: string;

  @IsBoolean()
  ruleBig: boolean;

  @IsBoolean()
  ruleSmall: boolean;

  @IsOptional()
  note?: string;
}
