import { PartialType } from '@nestjs/mapped-types';
import { CreateImportDatumDto } from './create-import-datum.dto';

export class UpdateImportDatumDto extends PartialType(CreateImportDatumDto) {}
