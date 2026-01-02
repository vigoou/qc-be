import { Expose } from 'class-transformer';

export class ResponseOOLRuleDto {
  id: string;

  @Expose({ name: 'off_code' })
  offCode: string;

  @Expose({ name: 'off_name' })
  offName: string;

  @Expose({ name: 'off_name_vn' })
  offNameVN: string;

  @Expose({ name: 'rule_big' })
  ruleBig: boolean;

  @Expose({ name: 'rule_small' })
  ruleSmall: boolean;

  note?: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}
